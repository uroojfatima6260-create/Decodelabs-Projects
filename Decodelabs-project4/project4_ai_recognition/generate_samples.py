"""
DecodeLabs Industrial Training Kit - Project 4 (Batch 2026)
Sample Input Generator: Creates test inputs for OCR (Path 1) and Object Detection (Path 2)
"""

import os
import cv2
import numpy as np

SAMPLES_DIR = os.path.join(os.path.dirname(__file__), "sample_inputs")

def create_invoice_sample():
    """Generates a sample invoice image for Path 1 OCR testing (PSM 11 / 3)."""
    img = np.ones((600, 800, 3), dtype=np.uint8) * 245  # Off-white paper background
    
    # Add noise & subtle gradient
    noise = np.random.normal(0, 3, img.shape).astype(np.uint8)
    img = cv2.add(img, noise)
    
    cv2.putText(img, "INVOICE #0042", (260, 80), cv2.FONT_HERSHEY_DUPLEX, 1.2, (20, 20, 20), 2)
    cv2.line(img, (100, 110), (700, 110), (100, 100, 100), 2)
    
    cv2.putText(img, "DATE: 2026-10-27", (100, 160), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (40, 40, 40), 2)
    cv2.putText(img, "ITEM: SERVER RACK UNIT", (100, 200), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (40, 40, 40), 2)
    cv2.putText(img, "QTY: 1", (100, 240), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (40, 40, 40), 2)
    cv2.putText(img, "TOTAL: $499.00", (100, 280), cv2.FONT_HERSHEY_DUPLEX, 0.8, (10, 10, 10), 2)
    
    cv2.rectangle(img, (80, 330), (720, 520), (200, 200, 200), 1)
    cv2.putText(img, "DESCRIPTION", (100, 370), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (50, 50, 50), 2)
    cv2.putText(img, "PRICE", (600, 370), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (50, 50, 50), 2)
    cv2.line(img, (90, 390), (710, 390), (180, 180, 180), 1)
    
    cv2.putText(img, "Artificial Intelligence Training Kit", (100, 430), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (30, 30, 30), 2)
    cv2.putText(img, "$499.00", (600, 430), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (30, 30, 30), 2)
    
    path = os.path.join(SAMPLES_DIR, "invoice_sample.png")
    cv2.imwrite(path, img)
    return path

def create_license_plate_sample():
    """Generates a sample license plate image for Path 1 OCR testing (PSM 7)."""
    img = np.ones((200, 600, 3), dtype=np.uint8) * 230
    cv2.rectangle(img, (10, 10), (590, 190), (30, 30, 30), 4)
    cv2.rectangle(img, (20, 20), (580, 180), (255, 255, 255), -1)
    cv2.rectangle(img, (20, 20), (80, 180), (200, 50, 0), -1) # State badge
    cv2.putText(img, "IND", (30, 110), cv2.FONT_HERSHEY_DUPLEX, 0.9, (255, 255, 255), 2)
    
    cv2.putText(img, "DL 01 AI 2026", (110, 120), cv2.FONT_HERSHEY_SIMPLEX, 1.8, (10, 10, 10), 5)
    
    path = os.path.join(SAMPLES_DIR, "license_plate.png")
    cv2.imwrite(path, img)
    return path

def create_street_scene_sample():
    """Generates a street scene sample image for Path 2 Object Detection testing."""
    img = np.ones((600, 800, 3), dtype=np.uint8) * 220
    # Sky
    img[0:300, :] = [230, 200, 150]
    # Road
    img[300:600, :] = [80, 80, 80]
    
    # Car body (MobileNet-SSD car)
    cv2.rectangle(img, (200, 350), (650, 500), (30, 60, 200), -1) # Red Car
    cv2.rectangle(img, (300, 280), (550, 350), (30, 60, 200), -1) # Roof
    # Wheels
    cv2.circle(img, (280, 500), 45, (20, 20, 20), -1)
    cv2.circle(img, (570, 500), 45, (20, 20, 20), -1)
    cv2.putText(img, "CAR", (380, 430), cv2.FONT_HERSHEY_DUPLEX, 1.2, (255, 255, 255), 3)

    # Person body
    cv2.circle(img, (100, 260), 25, (180, 150, 120), -1) # Head
    cv2.rectangle(img, (80, 285), (120, 420), (180, 50, 50), -1) # Shirt
    cv2.rectangle(img, (85, 420), (115, 520), (40, 40, 40), -1) # Pants
    cv2.putText(img, "PERSON", (50, 220), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (20, 20, 20), 2)

    path = os.path.join(SAMPLES_DIR, "street_scene.png")
    cv2.imwrite(path, img)
    return path

def generate_all():
    os.makedirs(SAMPLES_DIR, exist_ok=True)
    f1 = create_invoice_sample()
    f2 = create_license_plate_sample()
    f3 = create_street_scene_sample()
    print("Sample test inputs generated:")
    print(" -", f1)
    print(" -", f2)
    print(" -", f3)

if __name__ == "__main__":
    generate_all()
