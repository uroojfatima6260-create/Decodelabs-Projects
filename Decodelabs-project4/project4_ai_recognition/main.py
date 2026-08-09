"""
DecodeLabs Industrial Training Kit - Project 4 (Batch 2026)
Main Pipeline Executor: Image & Text Recognition Engine

Command Line Usage Examples:
1. Path 1 (OCR with Page Segmentation Mode tuning):
   python main.py --path 1 --image sample_inputs/invoice_sample.png --psm 11 --confidence 80.0

2. Path 2 (Object Detection with MobileNet-SSD & 80% Confidence Filter):
   python main.py --path 2 --image sample_inputs/street_scene.png --confidence 0.80

3. Full Automated Verification Suite:
   python test_pipeline.py
"""

import argparse
import os
import sys
import cv2
import numpy as np

from preprocessing import ImagePreprocessor
from ocr_engine import OCREngine
from object_detector import MobileNetSSDDetector
from generate_samples import generate_all

def parse_args():
    parser = argparse.ArgumentParser(description="DecodeLabs Project 4: AI Optic Nerve Recognition Pipeline")
    parser.add_argument("--path", type=int, choices=[1, 2], default=1, help="Path 1: OCR | Path 2: Object Detection")
    parser.add_argument("--image", type=str, default="", help="Path to input image file")
    parser.add_argument("--psm", type=int, default=3, choices=[3, 6, 7, 11], help="Page Segmentation Mode for OCR (3, 6, 7, 11)")
    parser.add_argument("--confidence", type=float, default=0.80, help="Confidence threshold filter (Default 0.80 = 80%% Gatekeeper)")
    parser.add_argument("--output_dir", type=str, default="outputs", help="Directory to store annotated output images")
    parser.add_argument("--no_preprocess", action="store_true", help="Disable pre-processing pipeline for raw benchmarking")
    return parser.parse_args()

def main():
    args = parse_args()
    
    # Ensure sample inputs exist
    generate_all()
    
    # Resolve default test image if none provided
    if not args.image:
        if args.path == 1:
            args.image = os.path.join(os.path.dirname(__file__), "sample_inputs", "invoice_sample.png")
        else:
            args.image = os.path.join(os.path.dirname(__file__), "sample_inputs", "street_scene.png")
            
    if not os.path.exists(args.image):
        print(f"[ERROR] Image file not found at: {args.image}")
        sys.exit(1)

    print("=" * 70)
    print("      DECODELABS INDUSTRIAL TRAINING KIT - BATCH 2026")
    print("      PROJECT 4: IMAGE & TEXT RECOGNITION PIPELINE")
    print("=" * 70)
    print(f"[IPO MODEL] Loading visual array input: {args.image}")
    
    image = cv2.imread(args.image)
    if image is None:
        print("[ERROR] Failed to decode visual matrix.")
        sys.exit(1)
        
    (h, w, c) = image.shape
    print(f"[MATRIX ANATOMY] Dimensions: Height={h}px, Width={w}px, Channels={c} (BGR)")
    print(f"[MATRIX ANATOMY] Total Data Points: {h * w * c:,}")

    os.makedirs(args.output_dir, exist_ok=True)
    
    # Standardize confidence filter scale (0.80 vs 80.0)
    conf_scale = args.confidence if args.confidence <= 1.0 else args.confidence / 100.0

    if args.path == 1:
        print("\n--- EXECUTION PATH 1: OPTICAL CHARACTER RECOGNITION (pytesseract) ---")
        ocr = OCREngine()
        results = ocr.recognize(
            image=image,
            psm=args.psm,
            min_confidence=conf_scale * 100.0,
            apply_preprocessing=not args.no_preprocess
        )
        
        print(f"\n[PSM MODE {results['psm_mode']}] {results['psm_description']}")
        print(f"[PRE-PROCESSING] Systematic Image Pre-Processing Executed:")
        print(f"  - Grayscale Matrix: Collapsed 3D -> 1D")
        print(f"  - Gaussian Blur: Smoothed noise (5x5 kernel)")
        print(f"  - Deskew Angle Calculated: {results['preprocessing_steps'].get('deskew_angle', 0.0):.2f}°")
        print(f"  - Adaptive/Otsu Binary Cutoff: {results['preprocessing_steps'].get('threshold_cutoff', 'N/A')}")
        
        print("\n[EXTRACTED TEXT STRING]:")
        print(f'"{results["extracted_text"]}"')
        
        print(f"\n[ACCURACY BENCHMARKING]")
        print(f"  - Average Word Confidence: {results['average_confidence']}%")
        print(f"  - Minimum Required Gate: {results['min_confidence_required']}%")
        print(f"  - Gatekeeper Milestone Validation Status: {'[PASSED]' if results['gatekeeper_milestone_passed'] else '[FAILED]'}")
        
        output_filename = os.path.join(args.output_dir, "ocr_output_annotated.png")
        cv2.imwrite(output_filename, results['annotated_image'])
        print(f"\n[VISUAL CONFIRMATION] Annotated visual saved to: {output_filename}")

    else:
        print("\n--- EXECUTION PATH 2: OBJECT DETECTION (MobileNet-SSD cv2.dnn) ---")
        detector = MobileNetSSDDetector()
        results = detector.detect(
            image=image,
            min_confidence=conf_scale
        )
        
        print(f"[BACKBONE] {results['architecture']}")
        print(f"[BLOB CONSTRUCTION] cv2.dnn.blobFromImage 4D Array Shape: {results['blob_shape']}")
        print(f"[THE 80% GATEKEEPER FILTER] Target Confidence Gate: {conf_scale*100:.1f}%")
        
        print(f"\n[DETECTION CANDIDATES SUMMARY]:")
        print(f"  - Total Candidates Evaluated: {results['total_raw_candidates']}")
        print(f"  - Validated Candidates Passed (>= 80%): {len(results['detections_passing_gate'])}")
        
        for det in results['detections_passing_gate']:
            print(f"    * [{det['class_name'].upper()}] Confidence: {det['confidence_percentage']} | BBox: {det['bbox']}")
            
        print(f"\n[ACCURACY BENCHMARKING]")
        print(f"  - Average Detection Confidence: {results['average_confidence']*100:.1f}%")
        print(f"  - Gatekeeper Milestone Validation Status: {'[PASSED]' if results['gatekeeper_milestone_passed'] else '[FAILED]'}")
        
        output_filename = os.path.join(args.output_dir, "object_detection_output_annotated.png")
        cv2.imwrite(output_filename, results['annotated_image'])
        print(f"\n[VISUAL CONFIRMATION] Annotated visual saved to: {output_filename}")

    print("\n=" * 70)
    print("      DECODELABS PROJECT 4 EXECUTION COMPLETE")
    print("=" * 70)

if __name__ == "__main__":
    main()
