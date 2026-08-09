"""
DecodeLabs Industrial Training Kit - Project 4 (Batch 2026)
Module: Systematic Image Pre-Processing (The Logic Skeleton)

This module implements the complete pre-processing pipeline for raw visual data:
Step 1: Grayscale Conversion (3D RGB matrix -> 1D intensity matrix)
Step 2: Gaussian Blur (Noise reduction and micro-imperfection smoothing)
Step 3: Deskewing (Rotation angle calculation to align tilted text lines)
Step 4: Adaptive & Otsu Thresholding (Binary decision logic: pixel >= cutoff -> 255 else 0)
"""

import cv2
import numpy as np

class ImagePreprocessor:
    def __init__(self):
        pass

    def to_grayscale(self, image: np.ndarray) -> np.ndarray:
        """
        Step 1: Grayscale Conversion
        Collapses 3D RGB/BGR matrix into 1D intensity matrix.
        Removes distracting chromatic noise.
        """
        if len(image.shape) == 2:
            return image
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    def apply_gaussian_blur(self, gray_image: np.ndarray, kernel_size: tuple = (5, 5)) -> np.ndarray:
        """
        Step 2: Gaussian Blur
        Smooths image matrix to eliminate high-frequency micro-imperfections.
        """
        return cv2.GaussianBlur(gray_image, kernel_size, 0)

    def estimate_deskew_angle(self, gray_image: np.ndarray) -> float:
        """
        Calculates rotation angle of tilted text to restore horizontal baseline.
        """
        # Threshold to invert image
        thresh = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
        coords = np.column_stack(np.where(thresh > 0))
        if len(coords) < 10:
            return 0.0
        angle = cv2.minAreaRect(coords)[-1]
        if angle < -45:
            angle = -(90 + angle)
        else:
            angle = -angle
        return angle

    def rotate_image(self, image: np.ndarray, angle: float) -> np.ndarray:
        """
        Rotates image by specified angle in degrees.
        """
        if abs(angle) < 0.1:
            return image
        (h, w) = image.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
        return rotated

    def apply_otsu_threshold(self, gray_image: np.ndarray) -> tuple[int, np.ndarray]:
        """
        Step 4: Otsu's Thresholding (Binary Decision)
        Calculates optimal threshold cutoff automatically minimizing intra-class variance.
        Math: IF pixel_intensity >= cutoff THEN 255 (White) ELSE 0 (Black)
        """
        cutoff, thresholded = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        return int(cutoff), thresholded

    def apply_adaptive_threshold(self, gray_image: np.ndarray, block_size: int = 11, C: int = 2) -> np.ndarray:
        """
        Step 4 Alternative: Adaptive Thresholding
        Computes threshold for small regions of the image, robust against uneven lighting.
        """
        return cv2.adaptiveThreshold(
            gray_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, block_size, C
        )

    def run_pipeline(self, image: np.ndarray, enable_blur: bool = True, enable_deskew: bool = True, method: str = 'otsu') -> dict:
        """
        Executes full systematic pre-processing pipeline and returns intermediate state matrices.
        """
        results = {
            'original': image.copy()
        }
        
        # Step 1: Grayscale
        gray = self.to_grayscale(image)
        results['grayscale'] = gray
        
        # Step 2: Gaussian Blur
        if enable_blur:
            blurred = self.apply_gaussian_blur(gray)
        else:
            blurred = gray
        results['blurred'] = blurred
        
        # Step 3: Deskewing
        if enable_deskew:
            angle = self.estimate_deskew_angle(blurred)
            deskewed = self.rotate_image(blurred, angle)
            results['deskew_angle'] = angle
        else:
            deskewed = blurred
            results['deskew_angle'] = 0.0
        results['deskewed'] = deskewed
        
        # Step 4: Thresholding
        if method == 'otsu':
            cutoff, binary = self.apply_otsu_threshold(deskewed)
            results['threshold_cutoff'] = cutoff
            results['binary'] = binary
        else:
            binary = self.apply_adaptive_threshold(deskewed)
            results['threshold_cutoff'] = 'Adaptive Gaussian'
            results['binary'] = binary
            
        return results
