import jsPDF from 'jspdf';
import { experienceData, skillCategories, educationData, certificatesData } from '@/config/data';
import { siteConfig } from '@/config/site';

interface TranslationGetter {
  (key: string): string;
}

// Colors matching the website palette
const COLORS = {
  ink: [42, 40, 38] as [number, number, number],
  terracotta: [217, 119, 87] as [number, number, number],
  midgray: [140, 138, 132] as [number, number, number],
  warmgray: [200, 198, 192] as [number, number, number],
  cream: [250, 249, 245] as [number, number, number],
};

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN_LEFT = 24;
const MARGIN_RIGHT = 24;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

function formatDate(dateStr: string, present: string): string {
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export function generateCV(t: {
  hero: TranslationGetter;
  experience: TranslationGetter;
  skills: TranslationGetter;
  about: TranslationGetter;
}) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = 0;

  const checkPageBreak = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - 20) {
      doc.addPage();
      y = 24;
    }
  };

  // ─── Header ───
  // Cream background strip at top
  doc.setFillColor(...COLORS.cream);
  doc.rect(0, 0, PAGE_WIDTH, 56, 'F');

  // Terracotta accent line
  doc.setFillColor(...COLORS.terracotta);
  doc.rect(MARGIN_LEFT, 56, CONTENT_WIDTH, 0.5, 'F');

  // Name
  y = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...COLORS.ink);
  doc.text(t.hero('name'), MARGIN_LEFT, y);

  // Title
  y += 9;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.terracotta);
  doc.text(t.hero('position'), MARGIN_LEFT, y);

  // Contact info row
  y += 9;
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.midgray);
  const contactParts = [
    siteConfig.contact.email,
    siteConfig.contact.phone,
    siteConfig.contact.location,
  ];
  doc.text(contactParts.join('  ·  '), MARGIN_LEFT, y);

  // Links row
  y += 5;
  doc.text(
    `github.com/o-holyshevskyi  ·  linkedin.com/in/oleksandr-holyshevskyi`,
    MARGIN_LEFT, y
  );

  // ─── Summary ───
  y = 66;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.terracotta);
  doc.text('PROFILE', MARGIN_LEFT, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.ink);
  const summaryLines = doc.splitTextToSize(t.about('summary'), CONTENT_WIDTH);
  doc.text(summaryLines, MARGIN_LEFT, y);
  y += summaryLines.length * 4 + 4;

  // Thin separator
  doc.setFillColor(...COLORS.warmgray);
  doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, 0.3, 'F');
  y += 8;

  // ─── Experience ───
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.terracotta);
  doc.text('EXPERIENCE', MARGIN_LEFT, y);
  y += 7;

  for (const job of experienceData) {
    const role = t.experience(`companies.${job.translationKey}.role`);
    const company = t.experience(`companies.${job.translationKey}.company`);
    const desc = t.experience(`companies.${job.translationKey}.description`);
    const start = formatDate(job.startDate, '');
    const end = job.endDate ? formatDate(job.endDate, '') : t.experience('present');

    const descLines = doc.splitTextToSize(desc, CONTENT_WIDTH - 2);
    checkPageBreak(16 + descLines.length * 3.8);

    // Role title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.ink);
    doc.text(role, MARGIN_LEFT, y);

    // Date on the right
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.midgray);
    doc.text(`${start} — ${end}`, PAGE_WIDTH - MARGIN_RIGHT, y, { align: 'right' });

    // Company name
    y += 4.5;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.terracotta);
    doc.text(company, MARGIN_LEFT, y);

    // Description
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.ink);
    doc.text(descLines, MARGIN_LEFT + 1, y);
    y += descLines.length * 3.8 + 5;
  }

  // Separator
  checkPageBreak(12);
  doc.setFillColor(...COLORS.warmgray);
  doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, 0.3, 'F');
  y += 8;

  // ─── Skills (two-column layout) ───
  checkPageBreak(50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.terracotta);
  doc.text('SKILLS & EXPERTISE', MARGIN_LEFT, y);
  y += 7;

  const colWidth = CONTENT_WIDTH / 2;
  const startY = y;

  skillCategories.forEach((cat, i) => {
    const col = i % 2;
    const x = MARGIN_LEFT + col * colWidth;

    if (col === 0 && i > 0) {
      y = startY + Math.floor(i / 2) * 22;
    }
    const catY = startY + Math.floor(i / 2) * 22;

    checkPageBreak(22);

    // Category name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.ink);
    doc.text(t.skills(`categories.${cat.translationKey}`), x, catY);

    // Skills list
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.midgray);
    const skillNames = cat.skills.map(s => s.name).join(', ');
    const skillLines = doc.splitTextToSize(skillNames, colWidth - 6);
    doc.text(skillLines, x, catY + 4.5);
  });

  y = startY + Math.ceil(skillCategories.length / 2) * 22 + 2;

  // Separator
  checkPageBreak(12);
  doc.setFillColor(...COLORS.warmgray);
  doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, 0.3, 'F');
  y += 8;

  // ─── Education ───
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.terracotta);
  doc.text('EDUCATION', MARGIN_LEFT, y);
  y += 7;

  for (const edu of educationData) {
    checkPageBreak(12);
    const degree = t.about(`aboutAccordion.education.${edu.translationKey}Degree`);
    const uni = t.about('aboutAccordion.education.university');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.ink);
    doc.text(degree, MARGIN_LEFT, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.midgray);
    doc.text(
      `${formatDate(edu.startDate, '')} — ${formatDate(edu.endDate, '')}`,
      PAGE_WIDTH - MARGIN_RIGHT, y, { align: 'right' }
    );

    y += 4.5;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.terracotta);
    doc.text(uni, MARGIN_LEFT, y);
    y += 7;
  }

  // Separator
  checkPageBreak(12);
  doc.setFillColor(...COLORS.warmgray);
  doc.rect(MARGIN_LEFT, y, CONTENT_WIDTH, 0.3, 'F');
  y += 8;

  // ─── Certifications ───
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.terracotta);
  doc.text('CERTIFICATIONS', MARGIN_LEFT, y);
  y += 7;

  const certNames: Record<string, string> = {
    istqb: 'Certified Tester, Foundation Level (ISTQB)',
    javascript: 'JavaScript Starter',
    gitBases: 'Git Bases',
  };

  for (const cert of certificatesData) {
    checkPageBreak(10);
    const certName = certNames[cert.translationKey] || cert.translationKey;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.ink);
    doc.text(certName, MARGIN_LEFT, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.midgray);
    doc.text(formatDate(cert.date + '-01', ''), PAGE_WIDTH - MARGIN_RIGHT, y, { align: 'right' });

    y += 4;
    doc.setFontSize(7.5);
    doc.text(`ID: ${cert.credentialId}  ·  ${cert.skills.join(', ')}`, MARGIN_LEFT, y);
    y += 7;
  }

  // ─── Footer accent ───
  const lastPage = doc.getNumberOfPages();
  for (let p = 1; p <= lastPage; p++) {
    doc.setPage(p);
    doc.setFillColor(...COLORS.terracotta);
    doc.rect(0, PAGE_HEIGHT - 4, PAGE_WIDTH, 4, 'F');

    // Page number (right-aligned, small)
    if (lastPage > 1) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...COLORS.midgray);
      doc.text(`${p} / ${lastPage}`, PAGE_WIDTH - MARGIN_RIGHT, PAGE_HEIGHT - 8, { align: 'right' });
    }
  }

  doc.save('Oleksandr_Holyshevskyi_CV.pdf');
}
