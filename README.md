# SECURER-COMPLIANCE V1

A self-contained Next.js questionnaire interface for cybersecurity regulatory mapping, requirement extraction, and generic test case generation.

## Project Overview

This repository delivers a single, browser-based workflow:

- A **Next.js UI** for collecting cybersecurity requirements, performing compliance analysis, and generating language-agnostic test cases.

## What the Project Includes

- `app/page.tsx` - Landing page and UI wrapper.
- `app/layout.tsx` - Application metadata and HTML shell.
- `app/globals.css` - Global visual theme and responsive styling.
- `app/components/QuestionnaireForm.tsx` - Multi-section questionnaire, regulatory scoring, requirement extraction, and generic compliance test-case generation.
- `workflow_prompts.py` - Separate Python file containing the SECURER-COMPLIANCE-V1 prompt workflow for RED, NIST, ISO, IEC and GDPR.
- `PROJECT_FLOW.md` - Detailed flow documentation.

## Flow of the Project

1. The user completes the questionnaire in the Next.js UI.
2. The SECURER maps answers to major cybersecurity frameworks such as RED, GDPR, NIST SP 800-63, ISO 27001 and IEC 62443.
3. The SECURER converts the responses into a compliance-focused summary and displays a regulation comparison.
4. The SECURER generates generic test case templates and language-agnostic compliance artifacts.
5. Download the result bundle and adapt the outputs to your implementation environment.

## Python Workflow File

A separate Python file, `workflow_prompts.py`, is included as a prompt workflow reference. It documents the five prompt stages used to convert questionnaire answers into compliance analysis and generic test outputs.

## Running the Next.js UI

Install dependencies and start the development server:

```bash
cd C:\SECURER_Framework\SECURER-COMPLIANCE-V1
npm install
npm run dev
```

Open `http://localhost:3000` to use the questionnaire interface.

## Using the Next.js Compliance Generator

The browser UI generates compliance mappings, requirements, and generic test cases directly from your questionnaire answers. No Python engine is required.

## How to Use It

- Open the Next.js UI and complete the questionnaire to capture system and security requirements.
- Review the regulation comparison and extracted requirements in the UI.
- Download the JSON results bundle containing generic compliance outputs that can be adapted to any IoT or system implementation.

## Notes

- This project does not assume features beyond the questionnaire answers.
- If a regulation is too vague for direct test generation, the UI highlights it for expert review.
- The generated test cases are templates, ready to be adapted to real system checks in any implementation language.
