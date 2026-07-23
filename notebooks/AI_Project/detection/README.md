# Detection 소스코드

**한블리 in my Pocket** 프로젝트에서 사용한 객체탐지(Object Detection) 모델 소스코드입니다.  
MMDetection 프레임워크 기반으로 YOLOv8을 활용해 블랙박스 영상에서 차량을 탐지합니다.

---

## 폴더 구조

```
detection/
├── apis/         # 학습(train), 추론(inference), 테스트(test) 실행 API
├── core/         # bbox 처리, 앵커 생성, 평가 지표 등 핵심 유틸
├── datasets/     # COCO 포맷 등 데이터셋 로더 및 전처리 파이프라인
├── models/       # 객체탐지 모델 구현
│   ├── detectors/    # YOLOv8 등 전체 탐지 모델 클래스
│   ├── backbones/    # ResNet 등 특징 추출 백본
│   ├── necks/        # FPN 등 특징 결합 모듈
│   ├── dense_heads/  # 탐지 헤드 (분류 + 회귀)
│   └── roi_heads/    # RoI 기반 2단계 탐지 헤드
└── utils/        # 로거, 분산처리, 기타 유틸리티
```

---

## 주요 기술

| 항목 | 내용 |
|------|------|
| 탐지 모델 | YOLOv8 |
| 트래킹 | DeepSORT |
| 데이터 증강 | Gamma Correction (어두운 영상 차량 경계 인식 개선) |
| 학습 데이터 | AI Hub 교통사고 영상 17,518건 |
| 최종 IoU | 0.792 (+0.006↑) |
