#!/usr/bin/env python3
"""Generate a clean, readable PDF setup guide from SETUP.md."""
import re
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table,
    XPreformatted, ListFlowable, ListItem, PageBreak, HRFlowable, KeepTogether
)
from reportlab.platypus.tableofcontents import TableOfContents

SRC = "/workspaces/clover/SETUP.md"
OUT = "/workspaces/clover/SETUP.pdf"

INK = colors.HexColor("#18181b")
MUTED = colors.HexColor("#52525b")
ACCENT = colors.HexColor("#2563eb")
CODEBG = colors.HexColor("#f4f4f5")
NOTEBG = colors.HexColor("#eff6ff")
QUOTEBORDER = colors.HexColor("#2563eb")
HEADBG = colors.HexColor("#18181b")

styles = getSampleStyleSheet()

def S(name, **kw):
    base = kw.pop("parent", styles["Normal"])
    return ParagraphStyle(name, parent=base, **kw)

body = S("Body", fontName="Helvetica", fontSize=10, leading=15, textColor=INK, spaceAfter=6)
h1 = S("H1", fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=colors.white,
       spaceBefore=6, spaceAfter=10, backColor=HEADBG, borderPadding=(6, 8, 6, 8), leftIndent=0)
h2 = S("H2", fontName="Helvetica-Bold", fontSize=12, leading=16, textColor=ACCENT,
       spaceBefore=10, spaceAfter=5)
title = S("Title", fontName="Helvetica-Bold", fontSize=26, leading=31, textColor=INK, alignment=TA_LEFT)
subtitle = S("Sub", fontName="Helvetica", fontSize=12, leading=17, textColor=MUTED)
toc_h = S("TOCH", fontName="Helvetica-Bold", fontSize=16, leading=20, textColor=INK, spaceAfter=10)
code = S("Code", fontName="Courier", fontSize=8.5, leading=11.5, textColor=colors.HexColor("#18181b"),
         backColor=CODEBG, borderPadding=(6, 7, 6, 7), leftIndent=0)
note_style = S("Note", fontName="Helvetica", fontSize=9.5, leading=14, textColor=INK)
bullet = S("Bullet", parent=body, spaceAfter=2)
listpara = S("ListPara", parent=body, spaceAfter=2, leftIndent=0)

def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def inline(t):
    t = esc(t)
    # bold
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    # inline code
    t = re.sub(r"`([^`]+)`", r'<font name="Courier" size="9">\1</font>', t)
    return t

class DocTmpl(BaseDocTemplate):
    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph):
            st = flowable.style.name
            txt = flowable.getPlainText()
            if st == "H1":
                self.notify("TOCEntry", (0, txt, self.page))
            elif st == "H2":
                self.notify("TOCEntry", (1, txt, self.page))

def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    # footer
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(2 * cm, 1.1 * cm, "Setup Guide — AraZhar Portfolio")
    canvas.drawRightString(w - 2 * cm, 1.1 * cm, "Halaman %d" % doc.page)
    canvas.setStrokeColor(colors.HexColor("#e4e4e7"))
    canvas.line(2 * cm, 1.45 * cm, w - 2 * cm, 1.45 * cm)
    canvas.restoreState()

def build():
    doc = DocTmpl(OUT, pagesize=A4, leftMargin=2 * cm, rightMargin=2 * cm,
                  topMargin=2 * cm, bottomMargin=1.8 * cm, title="Setup Guide — AraZhar Portfolio")
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=header_footer)])

    story = []
    with open(SRC, encoding="utf-8") as f:
        lines = f.read().split("\n")

    # ---- Cover ----
    story.append(Spacer(1, 3.2 * cm))
    story.append(Paragraph("Setup Guide", title))
    story.append(Paragraph("AraZhar Portfolio", S("CoverSub", fontName="Helvetica-Bold",
                 fontSize=16, leading=20, textColor=ACCENT, spaceAfter=6)))
    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph("Panduan lengkap dari nol sampai live. Ikuti langkah demi langkah.", subtitle))
    story.append(Spacer(1, 0.8 * cm))
    story.append(HRFlowable(width="100%", thickness=2, color=ACCENT))
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph("Tech Stack: Next.js 15 · Cloudflare Workers · D1 · OpenNext · Tailwind CSS v4",
                 S("CoverMeta", fontName="Helvetica", fontSize=10, textColor=MUTED)))
    story.append(PageBreak())

    # ---- Table of Contents ----
    story.append(Paragraph("Daftar Isi", toc_h))
    toc = TableOfContents()
    toc.levelStyles = [
        S("TOC1", fontName="Helvetica-Bold", fontSize=11, leading=18, textColor=INK),
        S("TOC2", fontName="Helvetica", fontSize=10, leading=15, textColor=MUTED, leftIndent=14),
    ]
    story.append(toc)
    story.append(PageBreak())

    i = 0
    n = len(lines)
    in_code = False
    code_buf = []
    code_lang = ""

    def flush_code():
        nonlocal code_buf
        if not code_buf:
            return
        text = "\n".join(code_buf)
        code_buf = []
        story.append(XPreformatted(text, code))
        story.append(Spacer(1, 4))

    while i < n:
        line = lines[i]

        # code fence
        if line.strip().startswith("```"):
            if in_code:
                flush_code()
                in_code = False
            else:
                in_code = True
                code_lang = line.strip().strip("`").strip()
                code_buf = []
            i += 1
            continue
        if in_code:
            code_buf.append(line)
            i += 1
            continue

        # horizontal rule
        if line.strip() == "---":
            story.append(Spacer(1, 4))
            story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#e4e4e7")))
            story.append(Spacer(1, 4))
            i += 1
            continue

        # title (# ) -> skip, cover already made
        if line.startswith("# "):
            i += 1
            continue

        # H2 section (## )
        if line.startswith("## "):
            story.append(Paragraph(inline(line[3:]), h1))
            i += 1
            continue

        # H3 subsection (### )
        if line.startswith("### "):
            story.append(Paragraph(inline(line[4:]), h2))
            i += 1
            continue

        # blockquote
        if line.startswith("> "):
            buf = [line[2:]]
            j = i + 1
            while j < n and lines[j].startswith("> "):
                buf.append(lines[j][2:])
                j += 1
            note_txt = "<br/>".join(inline(b) for b in buf)
            note_para = Paragraph(note_txt, note_style)
            tbl = Table([[note_para]], colWidths=[doc.width])
            tbl.setStyle([
                ("LINEBEFORE", (0, 0), (0, -1), 3, QUOTEBORDER),
                ("BACKGROUND", (0, 0), (-1, -1), NOTEBG),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ])
            story.append(tbl)
            story.append(Spacer(1, 5))
            i = j
            continue

        # table
        if line.strip().startswith("|") and i + 1 < n and lines[i + 1].strip().startswith("|") and \
           re.match(r"^\s*\|[\s:|-]+\|\s*$", lines[i + 1]):
            rows = []
            k = i
            while k < n and lines[k].strip().startswith("|"):
                cells = [c.strip() for c in lines[k].strip().strip("|").split("|")]
                rows.append(cells)
                k += 1
            # drop separator row (index 1)
            header = rows[0]
            data = rows[2:] if len(rows) > 2 else []
            tbl_data = [[Paragraph(inline(c), S("TH", fontName="Helvetica-Bold", fontSize=9,
                       textColor=colors.white, leading=12)) for c in header]]
            for r in data:
                tbl_data.append([Paragraph(inline(c), S("TD", fontName="Helvetica", fontSize=9,
                       leading=12, textColor=INK)) for c in r])
            t = Table(tbl_data, colWidths=[doc.width / len(header)] * len(header))
            t.setStyle([
                ("BACKGROUND", (0, 0), (-1, 0), HEADBG),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#fafafa")]),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#d4d4d8")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ])
            story.append(t)
            story.append(Spacer(1, 6))
            i = k
            continue

        # bullet list
        if re.match(r"^\s*[-*] ", line):
            items = []
            j = i
            while j < n and re.match(r"^\s*[-*] ", lines[j]):
                raw = re.sub(r"^\s*[-\*]\s+", "", lines[j])
                items.append(ListItem(Paragraph(inline(raw), bullet)))
                j += 1
            story.append(ListFlowable(items, bulletType="bullet", start="•",
                           leftIndent=14, bulletColor=ACCENT, spaceAfter=4))
            story.append(Spacer(1, 2))
            i = j
            continue

        # numbered list (1. 2. ...)
        if re.match(r"^\s*\d+\.\s", line):
            items = []
            j = i
            while j < n and re.match(r"^\s*\d+\.\s", lines[j]):
                content = re.sub(r"^\s*\d+\.\s", "", lines[j])
                items.append(ListItem(Paragraph(inline(content), bullet)))
                j += 1
            story.append(ListFlowable(items, bulletType="1", leftIndent=16,
                           bulletColor=ACCENT, spaceAfter=4))
            story.append(Spacer(1, 2))
            i = j
            continue

        # blank line
        if line.strip() == "":
            story.append(Spacer(1, 3))
            i += 1
            continue

        # normal paragraph
        story.append(Paragraph(inline(line), body))
        i += 1

    flush_code()
    doc.multiBuild(story)
    print("OK ->", OUT)

if __name__ == "__main__":
    build()
