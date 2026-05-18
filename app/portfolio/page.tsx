"use client";
// app/portfolio/page.tsx

import { useState } from "react";

type Project = {
  id: number;
  period: string;
  title: string;
  subtitle: string;
  team: string;
  tags: string[];
  overview: string;
  highlights: { label: string; value: string }[];
  sections: { title: string; content: string }[];
  result: string;
  pdfUrl?: string;
  dataDictUrl?: string;
  rawDataUrl?: string;
  notebooks?: { label: string; url: string }[];
  color: string;
};

const BASE = "https://github.com/parkjjeonghyun99/my-portfolio-pjh/blob/main";
const BASE_TREE = "https://github.com/parkjjeonghyun99/my-portfolio-pjh/tree/main";

const PROJECTS: Project[] = [
  {
    id: 1,
    period: "2025.03.30 – 2026.04.29",
    title: "한블리 in my Pocket",
    subtitle: "분류 모델과 VLM을 활용한 교통사고 상황 자동 분석 시스템",
    team: "포스코 청년 AI·Big Data 아카데미 32기 · A4팀 (5인)",
    tags: ["YOLOv8", "DeepSORT", "TSM", "Qwen2.5-VL-32B", "GPT image 2.0", "Python", "AI Hub"],
    pdfUrl: "/ai-project.pdf",
    overview:
      "사고 직후 운전자가 당황한 상태에서 객관적 정황 서술이 어렵고, 보험사 직원 도착 전까지 현장 대응이 지연되는 문제가 있습니다. 블랙박스 영상을 업로드하면 사고 장소·차량 행동을 자동 분류하고, VLM이 사고 경위를 자연어로 생성하며, 사고 약도와 함께 교통사고 협의서 PDF를 자동 출력하는 엔드-투-엔드 시스템을 구축했습니다.",
    highlights: [
      { label: "학습 데이터", value: "17,518건 (AI Hub 교통사고 영상)" },
      { label: "TSM 사고장소 분류 정확도", value: "72%" },
      { label: "TSM 차량A 행동 분류 (fine-tuning 후)", value: "62% (+8%p↑)" },
      { label: "TSM 차량B 행동 분류", value: "81%" },
      { label: "VLM 사실 일관성 (bbox+분류 입력 시)", value: "93.5%" },
      { label: "YOLOv8 + Gamma Correction IoU", value: "0.792 (+0.006↑)" },
    ],
    sections: [
      {
        title: "🔍 문제 정의",
        content:
          "교통사고 발생 직후 운전자는 당황한 상태에서 객관적인 사고 정황을 서술해야 합니다. 기존 교통사고 협의서는 수기 작성 방식으로, 진행 방향·사고 경위 등 객관적 상황 판단이 어렵고 작성에 상당한 시간이 소요됩니다. 또한 보험사 직원이 도착하기 전까지 현장 대응이 지연되는 문제가 있었습니다.",
      },
      {
        title: "🛠 기술 선택 이유",
        content:
          "객체탐지 모델로 YOLOv8을 선택했습니다. v9, v10 등 이후 버전 대비 정확도 면에서 다소 낮을 수 있으나, 속도와 경량화 측면에서 종합적으로 가장 적합하다고 판단했습니다. 행동 분류 모델로는 TSN과 TSM을 비교했고, 차량 A/B의 움직임을 시간 흐름 속에서 파악하는 것이 핵심이었기 때문에 프레임 간 정보 교환이 가능한 TSM을 최종 채택했습니다. VLM은 Qwen2.5-VL-32B와 LLaVA-NeXT-Video-32B를 비교했고, 한국어 출력 품질·핵심 객체 식별력·허위 정보 억제 측면에서 Qwen2.5-VL-32B가 전반적으로 우수했습니다.",
      },
      {
        title: "⚙️ 핵심 과정 및 개선",
        content:
          "데이터 전처리 단계에서 AI Hub 17,518건 중 조도 부족·역광·저화질 영상을 제거하고, 직선도로에 편중된 데이터를 5개 장소별 500건씩 균등 샘플링했습니다. YOLOv8에 Gamma Correction 증강을 적용해 어두운 영상에서의 차량 경계 인식을 개선했고(IoU 0.786→0.792), TSM에 SE Block과 Temporal Attention을 추가해 차량A 행동 분류 정확도를 54%→62%로 향상시켰습니다. VLM 입력 시 bbox 영상+분류 결과를 함께 제공했을 때 사실 일관성이 56.4%에서 93.5%로 크게 향상되었습니다.",
      },
      {
        title: "🔄 다른 접근 방식과의 비교",
        content:
          "행동 분류 모델로 TSN도 검토했으나, 차량 행동 분류에서 TSM이 TSN을 크게 앞섰습니다. VLM 프롬프트 방식도 Zero-shot, Few-shot, CoT를 모두 실험했고, CLIP Score 기준으로 Zero-shot(0.574)이 가장 높아 최종 채택했습니다.",
      },
    ],
    result:
      "사고 기본정보 입력 → 블랙박스 영상 제출 → 파손 부위 촬영 → 최종 협의서 PDF 자동 생성 파이프라인 완성. 운전자 관점에서 현장 즉시 대응 자동화에 초점을 맞춘 엔드-투-엔드 시스템을 구현했습니다.",
    color: "blue",
  },
  {
    id: 2,
    period: "2026.03.18 – 2026.03.27",
    title: "STS304 M형 결함 핵심 영향인자 도출 및 손실 Cost 최소화",
    subtitle: "POSCO 스테인리스 제조 공정 데이터 분석 · 최적 조업조건 도출",
    team: "포스코 청년 AI·Big Data 아카데미 · A4팀 (5인)",
    tags: ["Random Forest", "XGBoost", "LightGBM", "chi-squared", "ANOVA", "Python"],
    pdfUrl: "/bigdata-project.pdf",
    dataDictUrl: `${BASE}/notebooks/Bigdata_Project/sts_data_dictionary.pdf`,
    rawDataUrl: `${BASE_TREE}/notebooks/Bigdata_Project/data`,
    notebooks: [
      { label: "전체 분석", url: `${BASE}/notebooks/Bigdata_Project/Bigdata_Project_A4.ipynb` },
      { label: "소둔산세 EDA", url: `${BASE}/notebooks/Bigdata_Project/Bigdata_Project_A4_eda_소둔산세.ipynb` },
      { label: "연주공정 EDA", url: `${BASE}/notebooks/Bigdata_Project/Bigdata_Project_A4_eda_연주공정.ipynb` },
      { label: "제강공정 EDA", url: `${BASE}/notebooks/Bigdata_Project/Bigdata_Project_A4_eda_제강공정.ipynb` },
      { label: "열연 EDA", url: `${BASE}/notebooks/Bigdata_Project/Bigdata_Project_A4_eda_열연.ipynb` },
    ],
    overview:
      "STS304(18% Cr / 8% Ni 오스테나이트계 스테인리스강)의 M형 결함 불량률이 2022년 0.2%에서 2025년 2.7%로 급증하며 연간 손실 cost 837억 원이 발생했습니다. 약 23,000건의 제강·연주·열연·소둔산세 공정 데이터를 분석하여 핵심 영향인자(Vital Few)를 도출하고, 최적 조업 조건을 제시해 손실 비용을 186억 원 수준으로 절감하는 방안을 마련했습니다.",
    highlights: [
      { label: "분석 데이터", value: "약 23,000건 · 3단계 공정" },
      { label: "현재 불량률 → 목표 → 최적 조건 적용 시", value: "2.7% → 0.8% → 0.6%" },
      { label: "손실 cost 절감", value: "837억 → 186억 (62억 추가 절감)" },
      { label: "최종 모델 (Random Forest) AUC", value: "0.858" },
      { label: "열연-연주 일자 차이 최적화 시", value: "불량률 4.86%p 감소" },
      { label: "총 재로시간 최적화 시", value: "불량률 2.08%p 감소" },
    ],
    sections: [
      {
        title: "🔍 문제 정의",
        content:
          "POSCO STS304 제품의 M형 결함(열연 코일 생산 중 압연 방향을 따라 표면이 벗겨지는 결함) 불량률이 2025년 급증했습니다. 중국의 압도적 생산 점유율(78.7%) 속에서 한국(3.7%)이 품질 경쟁력을 유지하려면 결함 발생 원인을 데이터 기반으로 규명하고 공정 조건을 최적화하는 것이 시급했습니다.",
      },
      {
        title: "🛠 분석 접근 방식",
        content:
          "통계적 가설 검정은 각 변수가 불량 발생과 유의미한 관계가 있는지 판단하는 근거를 제공하기 때문에 우선적으로 수행되어야 했습니다. chi-squared test, t-test, ANOVA로 유의미한 변수를 먼저 선별하여 모델 성능과 해석력을 높이고자 하였습니다. 통계적으로는 p-value > 0.05로 유의미하지 않았던 델타 페라이트 함량 변수를 특허 문헌(대한민국 특허청 제 10-0397295호) 기반으로 Vital Few에 포함시켰습니다.",
      },
      {
        title: "⚙️ 모델 선정 과정",
        content:
          "Decision Tree, Random Forest, Gradient Boost, XGBoost, LightGBM 5개 모델을 비교했습니다. 불량 미검출(False Negative) 최소화가 핵심 목표였기 때문에 Recall을 우선 지표로 삼았고, AUC와 F1-score를 종합적으로 검토했습니다. Random Forest가 Recall 0.486, AUC 0.858로 가장 균형 잡힌 성능을 보여 최종 선정했습니다. Feature Importance 분석 결과 slab 장입온도(0.094), 소둔산세 후 두께(0.081), 예열대 온도(0.063) 순으로 중요도가 높았습니다.",
      },
      {
        title: "🔄 최적 조업 조건 도출",
        content:
          "KDE plot과 Boxplot을 활용해 각 Vital Few의 최적 구간을 도출했습니다. 열연-연주 일자 차이 3.28일 미만 유지 시 불량률 4.86%p 감소, 총 재로시간 206분 미만 유지 시 2.08%p 감소, 가열대-예열대 온도 차이 150~170°C 유지 시 1.78%p 감소가 가능합니다. 슬라브 장입온도 3σ 관리도(UCL 434.6 / Mean 351.2 / LCL 267.9)를 수립해 이상치 즉시 감지 체계를 구축했습니다.",
      },
    ],
    result:
      "최적 조업 조건 적용 시 M형 결함 불량률 2.1%p 감소(2.7%→0.6%), 손실 cost 837억→186억 절감 전망. 목표 대비 62억 원 추가 절감 효과. 2026년 12월까지 0.2% 수준 달성을 목표로 Pilot 적용 예정.",
    color: "indigo",
  },
];

const SKILLS = [
  { category: "ML / DL", items: ["Scikit-learn", "Random Forest", "XGBoost", "LightGBM", "YOLOv8", "OpenCV", "Qwen2.5-VL-32B", "Prompt Engineering"] },
  { category: "Data Analysis", items: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "chi-squared", "t-test", "ANOVA", "statsmodels"] },
  { category: "Infra / Tools", items: ["Next.js", "Vercel", "Git", "GitHub", "VSCode", "Jupyter", "Linux"] },
];

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
  const dotColor = project.color === "blue" ? "bg-blue-400" : "bg-indigo-400";

  return (
    <div className={`border-l-4 ${accent} bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-4`}>
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${badgeBg}`}>{project.period}</span>
          {project.pdfUrl && (
            <a href={project.pdfUrl} target="_blank" rel="noreferrer"
              className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded hover:bg-blue-100 transition">
              📄 발표자료
            </a>
          )}
          {project.dataDictUrl && (
            <a href={project.dataDictUrl} target="_blank" rel="noreferrer"
              className="text-xs bg-purple-50 text-purple-600 border border-purple-200 px-2 py-0.5 rounded hover:bg-purple-100 transition">
              📋 Data Dictionary
            </a>
          )}
          {project.rawDataUrl && (
            <a href={project.rawDataUrl} target="_blank" rel="noreferrer"
              className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded hover:bg-orange-100 transition">
              📂 Raw Data
            </a>
          )}
        </div>
        <h2 className={`mt-2 text-xl sm:text-2xl font-bold ${headingColor}`}>{project.title}</h2>
        <p className="text-sm text-gray-600 mt-0.5">{project.subtitle}</p>
        <p className="text-xs text-gray-400 mt-1">{project.team}</p>
        {project.notebooks && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.notebooks.map(n => (
              <a key={n.label} href={n.url} target="_blank" rel="noreferrer"
                className="text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded hover:bg-green-100 transition">
                📓 {n.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map(t => <Tag key={t} text={t} />)}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">{project.overview}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {project.highlights.map(h => (
          <div key={h.label} className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 leading-snug">{h.label}</p>
            <p className={`text-sm font-bold mt-1 ${headingColor}`}>{h.value}</p>
          </div>
        ))}
      </div>

      <button onClick={() => setOpen(v => !v)}
        className="text-sm font-medium text-gray-500 hover:text-gray-800 transition">
        {open ? "▲ 상세 내용 접기" : "▼ 상세 내용 보기"}
      </button>

      {open && (
        <div className="space-y-4 pt-1">
          {project.sections.map(s => (
            <div key={s.title} className="flex gap-3">
              <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{s.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{s.content}</p>
              </div>
            </div>
          ))}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 font-semibold mb-1">📌 최종 결과</p>
            <p className="text-sm text-gray-700">{project.result}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-16 sm:py-24">
          <p className="text-sm text-blue-500 font-semibold tracking-widest uppercase mb-3">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            박정현
            <span className="block text-2xl sm:text-3xl font-bold text-gray-400 mt-2">
              AI · Data Analyst
            </span>
          </h1>
          <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            데이터 분석 및 가설 검정을 통해 실제 산업 문제를 해결하는 것에 관심이 있습니다.
          </p>
          <p className="mt-2 text-gray-600 text-base sm:text-lg leading-relaxed">
            팀 프로젝트로 컴퓨터 비전·자연어처리·통계 분석을 활용하여 엔드-투-엔드 AI 시스템을 개발했습니다.
          </p>
          <p className="mt-2 text-gray-600 text-base sm:text-lg leading-relaxed">
            Next.js 기반 웹 페이지를 만들어 Vercel에 배포하는 작업을 진행했습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://github.com/parkjjeonghyun99" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-700 transition">
              GitHub
            </a>
            <a href="/resume"
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition">
              이력서 보기
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-12">
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

      <section className="max-w-6xl mx-auto px-8 py-4 pb-20">
        <h2 className="text-xl font-bold mb-6">Projects</h2>
        <div className="space-y-8">
          {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-400">© 2026 박정현</p>
          <a href="https://github.com/parkjjeonghyun99" target="_blank" rel="noreferrer"
            className="text-sm text-gray-400 hover:text-gray-700 transition">
            github.com/parkjjeonghyun99
          </a>
        </div>
      </footer>
    </main>
  );
}