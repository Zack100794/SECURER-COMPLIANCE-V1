# Project Flow Documentation

## Purpose

This document explains how the Next.js user interface and the Python compliance engine work together to capture requirements, map them to cybersecurity regulations, generate test artifacts, and report mitigation actions.

## 1. Questionnaire Capture (Next.js UI)

- The UI presents a structured questionnaire in four sections:
  1. Goals & Purpose
  2. Environment & Users
  3. Security Requirements
  4. Compliance & Trust
- Each question collects a specific aspect of system requirements, such as authentication preferences, privacy concerns, and outage-critical functions.
- Users progress through the sections and submit the final form.

## 2. Regulatory Analysis

- The UI performs a local analysis of the questionnaire answers.
- It matches responses against key regulations and standards:
  - GDPR / Data Protection
  - NIST SP 800-63
  - ISO 27001
  - IEC 62443
  - RED
- The output includes a short comparative match summary and an achieved score estimate for each regulation.

## 3. Testable Requirement Extraction

- The UI also converts the user answers into concrete requirement statements.
- Examples include:
  - "The system shall restrict remote control to authenticated users when remote access is enabled."
  - "The system shall encrypt sensitive user data at rest and in transit."
- These requirements are structured so downstream testing and validation can be built from them.

## 4. Test Specification Generation

- Based on the extracted requirements, the UI generates a set of test specifications.
- Each specification includes:
  - A test objective
  - A sequence of verification steps
  - Success criteria
- These specifications are designed to be granular enough for a junior tester or automation engineer.

## 5. Executable Test Generation

- The UI generates language-agnostic test cases and structured test steps for each requirement.
- Each generated test case includes:
  - A title and description
  - A sequence of verification steps
  - Notes for adapting the test to any implementation language or IoT platform
- A separate Python prompt workflow file, `workflow_prompts.py`, documents the same five-stage SECURER process.
- This preserves the traceability from requirement -> specification -> test case.

## 6. Countermeasure and Mitigation Reporting

- The app can also present mitigation recommendations for issues detected during conceptual test case review.
- It maps potential failures to:
  - Specific issue descriptions
  - Risk severity levels
  - Concrete remediation recommendations
  - The originating requirement identifier
- This closes the loop from "what happened" during testing to "what must be fixed" in the security posture.

## User Flow Summary

1. Open the Next.js UI at `http://localhost:3000`.
2. Complete the cybersecurity questionnaire.
3. Review regulatory mapping, requirements, and generic test cases.
4. Download the JSON results bundle and adapt the generic test cases to your IoT or system implementation.
5. Replace placeholder assertions with real system checks in the selected execution environment.

## Integration Notes

- The UI is a self-contained compliance generator.
- The browser-based workflow is used for requirements capture, regulatory evaluation, and generic test case creation.
- The generated outputs are language-agnostic so they can be adapted to any IoT device or system implementation.
