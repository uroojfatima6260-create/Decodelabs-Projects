import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Ensure public zip directory exists
const zipPath = path.join(process.cwd(), "DecodeLabs_Project4_AI_Recognition.zip");
const publicZipPath = path.join(process.cwd(), "public", "DecodeLabs_Project4_AI_Recognition.zip");

// Direct ZIP download endpoint
app.get("/api/download-zip", (req, res) => {
  if (fs.existsSync(publicZipPath)) {
    return res.download(publicZipPath, "DecodeLabs_Project4_AI_Recognition.zip");
  } else if (fs.existsSync(zipPath)) {
    return res.download(zipPath, "DecodeLabs_Project4_AI_Recognition.zip");
  }
  res.status(404).json({ error: "ZIP file not generated yet." });
});

// Get Python project files tree
app.get("/api/files", (req, res) => {
  const projDir = path.join(process.cwd(), "project4_ai_recognition");
  
  function getTree(dir: string, baseDir: string = ""): any[] {
    if (!fs.existsSync(dir)) return [];
    const items = fs.readdirSync(dir);
    return items.map(item => {
      const fullPath = path.join(dir, item);
      const relPath = path.join(baseDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        return {
          name: item,
          path: relPath,
          type: "directory",
          children: getTree(fullPath, relPath)
        };
      } else {
        return {
          name: item,
          path: relPath,
          type: "file",
          size: stat.size
        };
      }
    });
  }

  res.json({ files: getTree(projDir) });
});

// Read Python file content
app.get("/api/file-content", (req, res) => {
  const filePath = req.query.path as string;
  if (!filePath) return res.status(400).json({ error: "Missing path parameter" });

  const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
  const fullPath = path.join(process.cwd(), "project4_ai_recognition", safePath);

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const content = fs.readFileSync(fullPath, "utf-8");
    res.json({ path: safePath, content });
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

// Simulated/Live Pipeline Runner API
app.post("/api/run-pipeline", (req, res) => {
  const { path: modePath, sampleType, psm = 11, confidence = 0.8, enablePreprocessing = true } = req.body;
  
  // Pipeline Simulation Engine based on DecodeLabs Project 4 logic
  if (modePath === 1) {
    // Path 1: OCR
    const sampleNames: Record<string, string> = {
      invoice: "sample_inputs/invoice_sample.png",
      license_plate: "sample_inputs/license_plate.png",
      book_page: "sample_inputs/book_page.png"
    };

    const psmDescriptions: Record<number, string> = {
      3: "Fully automatic layout analysis (Default)",
      6: "Single uniform block of text (Book pages)",
      7: "Single text line (Vehicle number plates/headers)",
      11: "Sparse, scattered text (Invoices/Receipts)"
    };

    let extractedText = "";
    let detectedWords = [];
    
    if (sampleType === 'license_plate' || psm === 7) {
      extractedText = "DL 01 AI 2026";
      detectedWords = [
        { text: "DL", confidence: 99.1, passed_80_percent_gate: true, bbox: { x: 110, y: 70, width: 80, height: 60 } },
        { text: "01", confidence: 97.5, passed_80_percent_gate: true, bbox: { x: 210, y: 70, width: 70, height: 60 } },
        { text: "AI", confidence: 98.8, passed_80_percent_gate: true, bbox: { x: 300, y: 70, width: 70, height: 60 } },
        { text: "2026", confidence: 99.4, passed_80_percent_gate: true, bbox: { x: 390, y: 70, width: 140, height: 60 } }
      ];
    } else {
      // Invoice default
      extractedText = "INVOICE #0042 DATE: 2026-10-27 ITEM: SERVER RACK UNIT QTY: 1 TOTAL: $499.00 Artificial Intelligence Training Kit $499.00";
      detectedWords = [
        { text: "INVOICE", confidence: 98.4, passed_80_percent_gate: true, bbox: { x: 260, y: 80, width: 180, height: 40 } },
        { text: "#0042", confidence: 95.2, passed_80_percent_gate: true, bbox: { x: 450, y: 80, width: 110, height: 40 } },
        { text: "DATE:", confidence: 92.1, passed_80_percent_gate: true, bbox: { x: 100, y: 160, width: 90, height: 25 } },
        { text: "2026-10-27", confidence: 96.8, passed_80_percent_gate: true, bbox: { x: 200, y: 160, width: 160, height: 25 } },
        { text: "ITEM:", confidence: 91.0, passed_80_percent_gate: true, bbox: { x: 100, y: 200, width: 80, height: 25 } },
        { text: "SERVER RACK UNIT", confidence: 89.5, passed_80_percent_gate: true, bbox: { x: 190, y: 200, width: 280, height: 25 } },
        { text: "TOTAL:", confidence: 97.0, passed_80_percent_gate: true, bbox: { x: 100, y: 280, width: 110, height: 30 } },
        { text: "$499.00", confidence: 98.2, passed_80_percent_gate: true, bbox: { x: 220, y: 280, width: 140, height: 30 } },
        { text: "LOW_CONF_UNCERTAIN", confidence: 64.0, passed_80_percent_gate: false, bbox: { x: 100, y: 550, width: 220, height: 20 } }
      ];
    }

    const minConfPct = confidence <= 1.0 ? confidence * 100 : confidence;
    const filteredWords = detectedWords.map(w => ({
      ...w,
      passed_80_percent_gate: w.confidence >= minConfPct
    }));

    const passedWords = filteredWords.filter(w => w.passed_80_percent_gate);
    const avgConfidence = filteredWords.length ? +(filteredWords.reduce((a, b) => a + b.confidence, 0) / filteredWords.length).toFixed(1) : 0;

    return res.json({
      path: "Path 1: Optical Character Recognition (pytesseract)",
      psmMode: psm,
      psmDescription: psmDescriptions[psm] || "Custom PSM Layout",
      sampleType,
      extractedText: passedWords.map(w => w.text).join(" "),
      detectedWords: filteredWords,
      averageConfidence: avgConfidence,
      minConfidenceRequired: minConfPct,
      gatekeeperPassed: avgConfidence >= minConfPct || passedWords.length > 0,
      preprocessing: {
        grayscale: "3D BGR -> 1D Intensity Matrix",
        blurKernel: "5x5 Gaussian Kernel",
        deskewAngle: "-1.85°",
        thresholdCutoff: "Otsu Cutoff = 128 (Binary Decision: >=128 -> 255 else 0)"
      }
    });

  } else {
    // Path 2: Object Detection (MobileNet-SSD)
    const detections = [
      { class_id: 7, class_name: "car", confidence: 0.914, passed_80_percent_gate: 0.914 >= confidence, bbox: { origin_x: 200, origin_y: 280, width: 450, height: 220 } },
      { class_id: 15, class_name: "person", confidence: 0.852, passed_80_percent_gate: 0.852 >= confidence, bbox: { origin_x: 80, origin_y: 260, width: 40, height: 260 } },
      { class_id: 12, class_name: "dog", confidence: 0.620, passed_80_percent_gate: 0.620 >= confidence, bbox: { origin_x: 600, origin_y: 380, width: 120, height: 140 } }
    ];

    const passedDetections = detections.filter(d => d.confidence >= confidence);
    const avgConfidence = +(detections.reduce((a, b) => a + b.confidence, 0) / detections.length).toFixed(3);

    return res.json({
      path: "Path 2: Object Detection (MobileNet-SSD)",
      architecture: "MobileNet v3 + Single Shot Detector (SSD)",
      blobConstruction: {
        shape: [1, 3, 300, 300],
        scaleFactor: 0.007843,
        meanSubtraction: [127.5, 127.5, 127.5]
      },
      detections,
      passedDetections,
      totalCandidates: detections.length,
      passedCandidatesCount: passedDetections.length,
      averageConfidence: +(avgConfidence * 100).toFixed(1),
      minConfidenceRequired: +(confidence * 100).toFixed(1),
      gatekeeperPassed: passedDetections.length > 0
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DecodeLabs AI Project 4 server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
