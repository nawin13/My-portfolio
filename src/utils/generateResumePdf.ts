import { jsPDF } from 'jspdf';
import { RESUME_DATA } from '../data/portfolioData';

/**
 * Generates and triggers download of Putta Vaishnavi's official PDF resume directly to device
 */
export const downloadResumePdf = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(RESUME_DATA.personal.name, margin, y);
  y += 7;

  // Title & School
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(13, 148, 136); // teal-600
  doc.text(`${RESUME_DATA.personal.title} | ${RESUME_DATA.personal.institution}`, margin, y);
  y += 5.5;

  // Contact Line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600
  const contactText = `${RESUME_DATA.personal.email}  |  ${RESUME_DATA.personal.phone}  |  ${RESUME_DATA.personal.location}`;
  doc.text(contactText, margin, y);
  y += 4.5;
  const linksText = `LinkedIn: ${RESUME_DATA.personal.linkedin}  |  GitHub: ${RESUME_DATA.personal.github}`;
  doc.text(linksText, margin, y);
  y += 5;

  // Divider Line
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.4);
  doc.line(margin, y, margin + contentWidth, y);
  y += 6;

  // Section: Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('PROFESSIONAL SUMMARY', margin, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(RESUME_DATA.personal.profile, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.2 + 4;

  // Section: Education
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('EDUCATION', margin, y);
  y += 4.5;

  RESUME_DATA.education.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.institution, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(edu.period, margin + contentWidth, y, { align: 'right' });
    y += 4.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(13, 148, 136);
    doc.text(`${edu.degree} - ${edu.location}`, margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    edu.modules.forEach((mod) => {
      const bullet = `• ${mod}`;
      const modLines = doc.splitTextToSize(bullet, contentWidth - 4);
      doc.text(modLines, margin + 2, y);
      y += modLines.length * 3.8;
    });
    y += 2.5;
  });

  // Section: Professional Experience
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('PROFESSIONAL EXPERIENCE', margin, y);
  y += 4.5;

  RESUME_DATA.experience.forEach((exp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`${exp.role} - ${exp.company}`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(exp.period, margin + contentWidth, y, { align: 'right' });
    y += 4.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`${exp.location} | ${exp.type}`, margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    exp.bullets.forEach((bullet) => {
      const bText = `• ${bullet}`;
      const bLines = doc.splitTextToSize(bText, contentWidth - 4);
      doc.text(bLines, margin + 2, y);
      y += bLines.length * 3.8;
    });
    y += 2.5;
  });

  // Section: Featured Projects
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('FEATURED PROJECTS', margin, y);
  y += 4.5;

  RESUME_DATA.projects.forEach((proj) => {
    if (y > 265) {
      doc.addPage();
      y = 16;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${proj.title} (${proj.category})`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(proj.period, margin + contentWidth, y, { align: 'right' });
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const pLines = doc.splitTextToSize(`• ${proj.description}`, contentWidth - 4);
    doc.text(pLines, margin + 2, y);
    y += pLines.length * 3.8;

    const stackText = `  Stack: ${proj.stack.join(', ')}`;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(13, 148, 136);
    doc.text(stackText, margin + 2, y);
    y += 4.5;
  });

  // Section: Technical Competencies
  if (y > 255) {
    doc.addPage();
    y = 16;
  } else {
    y += 2;
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('TECHNICAL COMPETENCIES', margin, y);
  y += 4.5;

  RESUME_DATA.competencies.forEach((comp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${comp.category}: `, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const skillsText = comp.skills.join(', ');
    const sLines = doc.splitTextToSize(skillsText, contentWidth - 38);
    doc.text(sLines, margin + 38, y);
    y += Math.max(sLines.length * 3.8, 4.2);
  });

  // Languages
  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Languages: ', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const langText = RESUME_DATA.languages.map((l) => `${l.name} (${l.level})`).join(', ');
  doc.text(langText, margin + 38, y);

  // Trigger real file download directly onto device
  doc.save('Putta_Vaishnavi_Resume.pdf');
};
