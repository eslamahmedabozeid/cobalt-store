import React from 'react';

interface QuestionnaireSectionProps {
  step: string;
  icon: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}

export default function QuestionnaireSection({
  step,
  icon,
  title,
  desc,
  children,
}: QuestionnaireSectionProps) {
  return (
    <div className="questionnaire-section-box">
      <div className="section-box-header">
        <div className="section-step-badge">{step}</div>
        <div className="section-header-info">
          <h3 className="section-box-title">
            <span className="section-icon">{icon}</span> {title}
          </h3>
          <p className="section-box-desc">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
