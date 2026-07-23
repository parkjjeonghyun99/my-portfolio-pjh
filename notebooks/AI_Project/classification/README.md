# Classification 소스코드

**한블리 in my Pocket** 프로젝트에서 사용한 영상 분류(Video Classification) 모델 소스코드입니다.  
MMAction2 프레임워크 기반으로 TSM을 활용해 블랙박스 영상에서 사고 장소 및 차량 행동을 분류합니다.

---

## 폴더 구조

```
classification/
├── apis/         # 학습(train), 추론(inference), 테스트(test) 실행 API
├── core/         # 평가 지표, 훅(Hook), 옵티마이저, 학습률 스케줄러
├── datasets/     # 영상 데이터셋 로더 및 전처리 파이프라인
├── models/       # 영상 분류 모델 구현
│   ├── recognizers/  # TSM(2D), SlowFast(3D) 등 분류 모델 클래스
│   ├── backbones/    # ResNet-TSM 등 특징 추출 백본
│   ├── heads/        # TSM Head, I3D Head 등 분류 헤드
│   └── losses/       # Cross Entropy 등 손실 함수
└── utils/        # 로거, GradCAM 시각화, 기타 유틸리티
```

---

## 주요 기술

| 항목 | 내용 |
|------|------|
| 분류 모델 | TSM (Temporal Shift Module) |
| 백본 | ResNet-50 |
| 개선 사항 | SE Block + Temporal Attention 추가 |
| 분류 항목 | 사고 장소(5종), 차량A 행동, 차량B 행동 |
| 사고 장소 분류 정확도 | 72% |
| 차량A 행동 분류 (fine-tuning 후) | 62% (+8%p↑) |
| 차량B 행동 분류 | 81% |
