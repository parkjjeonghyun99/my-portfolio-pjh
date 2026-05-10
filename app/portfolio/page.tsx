"use client";
// app/portfolio/page.tsx

import { useState } from "react";

/* ──────────────────────────────────────────
   타입
────────────────────────────────────────── */
type Project = {
  id: number;
  period: string;
  title: string;
  subtitle: string;
  team: string;
  tags: string[];
  overview: string;
  highlights: { label: string; value: string }[];
  tasks: { name: string; desc: string }[];
  result: string;
  color: string; // tailwind accent color keyword
};

/* ──────────────────────────────────────────
   데이터
────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 1,
    period: "2025.02 – 2026.04",
    title: "한블리 in my Pocket",
    subtitle: "분류 모델과 VLM을 활용한 교통사고 상황 자동 분석 시스템",
    team: "포스코 청년 AI·Big Data 아카데미 32기 · A4팀 (5인)",
    tags: ["YOLOv8", "DeepSORT", "TSM", "Qwen2.5-VL-32B", "GPT image 2.0", "Python", "AI Hub"],
    overview:
      "사고 직후 운전자가 당황한 상태에서 객관적 정황 서술이 어렵고, 보험사 직원 도착 전까지 현장 대응이 지연되는 문제를 해결합니다. 블랙박스 영상을 업로드하면 사고 장소·차량 행동을 자동 분류하고 VLM이 사고 경위를 자연어로 생성, 사고 약도와 함께 교통사고 협의서 PDF를 자동 출력합니다.",
    highlights: [
      { label: "학습 데이터", value: "17,518건 (AI Hub 교통사고 영상)" },
      { label: "TSM 사고장소 분류 정확도", value: "72%" },
      { label: "TSM 차량A 행동 분류 (fine-tuning 후)", value: "62% (+8%p↑)" },
      { label: "TSM 차량B 행동 분류", value: "81%" },
      { label: "VLM 사실 일관성 (bbox+분류 입력 시)", value: "93.5%" },
      { label: "YOLOv8 + Gamma Correction IoU", value: "0.792 (+0.006↑)" },
    ],
    tasks: [
      { name: "Task 1 · 데이터 전처리", desc: "5개 사고 장소 균등 샘플링(각 500건), 저화질·역광 영상 제거, Class Oversampling으로 차량 A/B 행동 불균형 완화" },
      { name: "Task 2 · 객체탐지 + 분류모델", desc: "YOLOv8 + DeepSORT로 차량 BBox 추출·추적. TSN vs TSM 비교 후 TSM 채택. SE Block + Temporal Attention fine-tuning으로 차량A 분류 +8%p 향상" },
      { name: "Task 3 · VLM 모델 선정", desc: "Qwen2.5-VL-32B vs LLaVA-NeXT-Video 비교. CLIP Score 기준 Zero-shot 방식 채택. bbox+분류 정보 제공 시 사실 일관성 93.5%로 대폭 향상" },
      { name: "Task 4 · 사고 약도 생성", desc: "VLM 출력 + 사고 유형별 System Prompt를 GPT image 2.0에 입력, Top-Down 벡터 스타일 약도 자동 생성" },
      { name: "Task 5 · 파손 부위 탐지", desc: "YOLOv8s 채택 (mAP50 0.87, Recall 0.81). Greedy 알고리즘으로 16,346장 데이터 불균형 해소" },
    ],
    result:
      "사고 기본정보 입력 → 블랙박스 영상 제출 → 파손 부위 촬영 → 최종 협의서 PDF 자동 생성 파이프라인 완성. 운전자 관점에서 현장 즉시 대응 자동화에 초점을 맞춘 국내 최초 엔드-투-엔드 시스템.",
    color: "blue",
  },
  {
    id: 2,
    period: "2026.03.19 – 2026.03.27",
    title: "STS304 M형 결함 핵심 영향인자 도출 및 손실 Cost 최소화",
    subtitle: "POSCO 스테인리스 제조 공정 데이터 분석 · 최적 조업조건 도출",
    team: "포스코 청년 AI·Big Data 아카데미 · A4팀 (5인)",
    tags: ["Random Forest", "XGBoost", "LightGBM", "SMOTE", "chi-squared", "ANOVA", "Python", "POSCO"],
    overview:
      "STS304(18% Cr / 8% Ni 오스테나이트계 스테인리스강)의 M형 결함 불량률이 2022년 0.2%에서 2025년 2.7%로 급증, 연간 손실 cost 837억 원이 발생했습니다. 약 23,000건의 제강·연주·열연·소둔산세 공정 데이터를 통계 분석 및 머신러닝으로 분석하여 Vital Few를 도출하고 공정 조업조건을 최적화했습니다.",
    highlights: [
      { label: "분석 데이터", value: "약 23,000건 · 3단계 공정(제강/열연/소둔산세)" },
      { label: "현재 불량률 → 목표 → 최적 조건 적용 시", value: "2.7% → 0.8% → 0.6%" },
      { label: "손실 cost 절감", value: "837억 → 186억 (목표 대비 62억 추가 절감)" },
      { label: "최종 예측 모델 (Random Forest) AUC", value: "0.858" },
      { label: "열연-연주 일자 차이 최적화 시 불량률 감소", value: "4.86%p 감소 가능" },
      { label: "총 재로시간 최적화 시 불량률 감소", value: "2.08%p 감소 가능" },
    ],
    tasks: [
      { name: "EDA · 공장 & 설비 분석", desc: "chi-squared test로 제강 2공장(3.3%), 소둔산세 B조(3.7%), 가열로 3호기(3.1%), CCR 방식(4.3%) 등 유의미한 불량률 차이 검증" },
      { name: "Vital Few 도출", desc: "히스토그램·KDE·t-test·ANOVA로 slab 장입온도(280°C↑), 총 재로시간(206분↓), 열연-연주 일자 차이(3.28일↓), 가열대-예열대 온도 차이(150~170°C), 균열대 재로시간(57분↓) 식별" },
      { name: "불량 예측 모델 개발", desc: "DT / RF / GB / XGBoost / LightGBM 비교 → RF 최종 선정 (Recall 0.486, AUC 0.858). Feature Importance: slab 장입온도(0.094) > 소둔산세 후 두께(0.081) > 예열대 온도(0.063)" },
      { name: "공정 조건 최적화", desc: "후물(4.48mm↑) 소둔산세 라인 속도 26~29mpm 구간, 델타 페라이트 함량 6~8% 구간 도출. SMOTE로 양품/불량 불균형 데이터 오버샘플링" },
      { name: "Process Control", desc: "슬라브 장입온도 3σ 관리도 수립. UCL 434.6 / Mean 351.2 / LCL 267.9로 이상치 즉시 감지 체계 구축" },
    ],
    result:
      "최적 조업 조건 적용 시 M형 결함 불량률 2.1%p 감소(2.7% → 0.6%), 손실 cost 837억 → 186억 절감 전망. 2026년 12월까지 0.2% 수준 달성을 목표로 Pilot 적용 예정.",
    color: "indigo",
  },
];

const SKILLS = [
  { category: "AI / ML", items: ["Python", "YOLOv8", "TSM", "Random Forest", "XGBoost", "LightGBM", "Scikit-learn", "OpenCV"] },
  { category: "Data", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "SMOTE", "chi-squared", "ANOVA"] },
  { category: "Web / Dev", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Git"] },
];

/* ──────────────────────────────────────────
   컴포넌트
────────────────────────────────────────── */
function Tag({ text }: { text: string }) {
  return (
    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
      {text}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const accent = project.color === "blue" ? "border-blue-500" : "border-indigo-500";
  const badgeBg = project.color === "blue" ? "bg-blue-50 text-blue-700" : "bg-indigo-50 text-indigo-700";
  const headingColor = project.color === "blue" ? "text-blue-600" : "text-indigo-600";

  return (
    <div className={`border-l-4 ${accent} bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-4`}>
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${badgeBg}`}>{project.period}</span>
          <h2 className={`mt-2 text-xl sm:text-2xl font-bold ${headingColor}`}>{project.title}</h2>
          <p className="text-sm text-gray-600 mt-0.5">{project.subtitle}</p>
          <p className="text-xs text-gray-400 mt-1">{project.team}</p>
        </div>
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map(t => <Tag key={t} text={t} />)}
      </div>

      {/* 개요 */}
      <p className="text-gray-700 text-sm leading-relaxed">{project.overview}</p>

      {/* 주요 수치 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {project.highlights.map(h => (
          <div key={h.label} className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 leading-snug">{h.label}</p>
            <p className={`text-sm font-bold mt-1 ${headingColor}`}>{h.value}</p>
          </div>
        ))}
      </div>

      {/* 토글: Task 상세 */}
      <button
        onClick={() => setOpen(v => !v)}
        className="text-sm font-medium text-gray-500 hover:text-gray-800 transition flex items-center gap-1"
      >
        {open ? "▲ 접기" : "▼ Task 상세 보기"}
      </button>

      {open && (
        <div className="space-y-3 pt-1">
          {project.tasks.map(t => (
            <div key={t.name} className="flex gap-3">
              <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${project.color === "blue" ? "bg-blue-400" : "bg-indigo-400"}`} />
              <div>
                <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-600">{t.desc}</p>
              </div>
            </div>
          ))}
          <div className="bg-gray-50 rounded-xl p-4 mt-2">
            <p className="text-xs text-gray-500 font-semibold mb-1">📌 결과</p>
            <p className="text-sm text-gray-700">{project.result}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────
   메인 페이지
────────────────────────────────────────── */
export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Hero ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
          <p className="text-sm text-blue-500 font-semibold tracking-widest uppercase mb-3">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            박정현
            <span className="block text-2xl sm:text-3xl font-bold text-gray-400 mt-2">
              AI · Data Analyst
            </span>
          </h1>
          <p className="mt-6 text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            데이터 분석과 AI 모델링을 통해 실제 산업 문제를 해결하는 것에 관심이 있습니다.
            컴퓨터 비전·자연어처리·통계 분석을 결합하여 엔드-투-엔드 AI 시스템을 개발하고,
            Next.js 기반 웹 서비스로 이를 사용자에게 전달합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/parkjjeonghyun99"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-700 transition"
            >
              GitHub
            </a>
            <a
              href="/resume"
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition"
            >
              이력서 보기
            </a>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold mb-6">Skills</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {SKILLS.map(s => (
            <div key={s.category} className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-3">{s.category}</p>
              <div className="flex flex-wrap gap-2">
                {s.items.map(i => <Tag key={i} text={i} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="max-w-4xl mx-auto px-6 py-4 pb-20">
        <h2 className="text-xl font-bold mb-6">Projects</h2>
        <div className="space-y-8">
          {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-400">© 2026 박정현</p>
          <a
            href="https://github.com/parkjjeonghyun99"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-400 hover:text-gray-700 transition"
          >
            github.com/parkjjeonghyun99
          </a>
        </div>
      </footer>
    </main>
  );
}