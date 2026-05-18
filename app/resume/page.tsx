export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-gray-800">

      <section className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-1">박 정 현</h1>
          <p className="text-blue-600 font-medium text-lg mb-3">AI · 데이터 분석</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>🎂 1999.05.05</p>
            <p>📞 010-4643-3956</p>
            <p>📧 jhpark050599@naver.com</p>
            <p>📍 경상남도 양산시</p>
            <p>🪖 육군 병장 만기전역 (2019.01 – 2020.08)</p>
            <a href="https://github.com/parkjjeonghyun99" target="_blank" className="flex items-center gap-1 hover:text-gray-800 transition">
              🐙 github.com/parkjjeonghyun99
            </a>
          </div>
        </div>
        <img src="/profile.jpg" alt="프로필 사진" className="w-28 h-36 object-cover rounded" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-1 mb-4">EDUCATION · 학력</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">경성대학교</p>
              <p className="text-gray-500 text-sm">빅데이터응용통계학과 · 4년제 · 부산광역시 남구</p>
            </div>
            <p className="text-sm text-gray-400">2018.03 – 2024.02 졸업</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">물금고등학교</p>
              <p className="text-gray-500 text-sm">자연계열 · 경상남도 양산</p>
            </div>
            <p className="text-sm text-gray-400">2015.03 – 2018.02 졸업</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-1 mb-4">CERTIFICATIONS · 자격증 & 어학</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <p><span className="font-semibold">빅데이터분석기사</span> · 한국데이터산업진흥원</p>
            <p className="text-gray-400">2025.12</p>
          </div>
          <div className="flex justify-between">
            <p><span className="font-semibold">데이터분석준전문가 (ADsP)</span> · 한국데이터산업진흥원</p>
            <p className="text-gray-400">2024.06</p>
          </div>
          <div className="flex justify-between">
            <p><span className="font-semibold">TOEIC Speaking</span> · 150점 / Intermediate High</p>
            <p className="text-gray-400">2026.03</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-1 mb-4">TECH STACK · 기술 스택</h2>
        <div className="space-y-2 text-sm">
          {[
            { label: "Language", items: ["Python"] },
            { label: "ML / DL", items: ["scikit-learn", "YOLOv8", "OpenCV", "Qwen2.5-VL-32B-Instruct-AWQ"] },
            { label: "Data Analysis", items: ["pandas", "NumPy", "matplotlib", "seaborn", "통계 가설검정"] },
            { label: "Infra / Tools", items: ["Linux", "Git", "Jupyter", "VS Code", "Next.js", "Vercel"] },
          ].map(({ label, items }) => (
            <div key={label} className="flex gap-4">
              <p className="w-32 text-gray-500 shrink-0">{label}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-1 mb-4">PROJECTS · 프로젝트 경험</h2>
        <div className="space-y-6">

          <div>
            <div className="flex justify-between items-start mb-1">
              <div>
                <p className="font-bold">한블리 in my Pocket</p>
                <p className="text-sm text-gray-500">분류 모델과 VLM을 활용한 사고 상황 자동 분석 시스템</p>
                <p className="text-xs text-blue-500 mt-0.5">포스코 청년 AI·Big Data 아카데미 32기 팀 프로젝트 (A4) · 5인</p>
              </div>
              <p className="text-sm text-gray-400 shrink-0">2026.03.30 - 2026.04.29</p>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
              <li>AI Hub 교통사고 블랙박스 영상 데이터셋(17,518건) 활용, 사고 장소·차량 행동 자동 분류 파이프라인 설계</li>
              <li>YOLOv8 + Gamma Correction 증강으로 어두운 환경 차량 BBox 검출 성능 개선 (IoU 0.786 → 0.792)</li>
              <li>TSM-ResNet50에 SE Block + Temporal Attention 도입, 차량 행동 분류 정확도 8%p 향상 (54% → 62%)</li>
              <li>Qwen2.5-VL-32B VLM + Zero-shot 프롬프트로 사고 경위 자동 서술, 사실 일관성 93.5% 달성</li>
              <li>YOLOv8s 차량 파손 부위 탐지 (mAP50: 0.87), GPT image 2.0 사고 약도 생성 → 협의서 PDF 자동 출력</li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          <div>
            <div className="flex justify-between items-start mb-1">
              <div>
                <p className="font-bold">STS304 M형 결함 핵심 영향인자 도출 및 손실 Cost 최소화</p>
                <p className="text-xs text-blue-500 mt-0.5">포스코 청년 AI·Big Data 아카데미 팀 프로젝트 (A4) · 5인</p>
              </div>
              <p className="text-sm text-gray-400 shrink-0">2026.03.18 - 2026.03.27</p>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
              <li>POSCO STS304 제조 공정 데이터 분석 (약 23,000건, 3단계 공정)</li>
              <li>chi-squared test, t-test, ANOVA 등 통계 검정으로 공장·설비·공정별 불량 차이 규명</li>
              <li>Decision Tree·Random Forest·GBM·XGBoost·LightGBM 비교, RF 최종 선정 (AUC 0.858)</li>
              <li className="font-medium text-gray-700">결과: M형 결함 불량률 2.7% → 0.6% 달성, 손실 Cost 837억 → 186억원 절감 전망</li>
            </ul>
          </div>

        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-1 mb-4">EDUCATION PROGRAM · 교육 이수</h2>
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">포스코 청년 AI·Big Data 아카데미 32기</p>
            <p className="text-sm text-gray-500">포스코 인재창조원 · 포스텍 인공지능연구원 주관 / 자연어 처리 · 딥러닝 · 컴퓨터 비전 · 데이터 분석 실무</p>
          </div>
          <p className="text-sm text-gray-400 shrink-0">2026.02 – 2026.04</p>
        </div>
      </section>

    </main>
  );
}