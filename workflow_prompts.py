"""
SECURER-COMPLIANCE-V1 Prompt Workflow

This standalone Python file documents the five prompt stages used in the SECURER compliance workflow.
It is provided as a separate reference artifact and does not need to be executed by the Next.js UI.

The workflow stages are:
1. Regulatory analysis for RED, GDPR, NIST SP 800-63, ISO 27001, and IEC 62443.
2. Testable requirement extraction from questionnaire answers.
3. Test specification generation for each requirement.
4. Executable test generation in a language-agnostic, template-friendly style.
5. Countermeasure and mitigation reporting mapping test failures to risk and remediation.
"""

from __future__ import annotations
from typing import Any, Dict

PROMPTS: Dict[str, str] = {
    'regulatory_analysis': (
        'You are a cybersecurity compliance analyst. Given the user answers to a device/system questionnaire, '
        'evaluate alignment with the following frameworks: RED, GDPR, NIST SP 800-63, ISO 27001, and IEC 62443. '
        'For each regulation, provide a concise match summary, a score estimate between 0 and 100, and one specific reason '
        'for the rating based on the input. Use the answers to identify privacy, authentication, resilience, access control, and data protection signals.'
    ),
    'requirement_extraction': (
        'You are an requirements engineer. Convert the questionnaire answers into a set of concrete, testable requirement statements. '
        'Each requirement should be short, mandatory in tone, and traceable to the user answers. Include an identifier, a requirement description, and a note explaining the source of the requirement.'
    ),
    'specification_generation': (
        'You are a test designer. For each extracted requirement, generate a test specification containing a test objective, a sequence of verification steps, and clear success criteria. '
        'Keep the specifications implementation-neutral, so they can be adapted to any IoT device or system environment.'
    ),
    'executable_test_generation': (
        'You are a compliance automation specialist. Convert the test specifications into executable test templates. '
        'Produce language-agnostic, pseudo-code-friendly test cases that preserve traceability to the originating requirement. '
        'Include placeholders for system-specific actions and final assertions so the tests can be adapted to Python, JavaScript, embedded C, or other environments.'
    ),
    'countermeasure_reporting': (
        'You are a risk remediation analyst. Given the requirement list and test case outcomes, create a mitigation report that maps each failed or weak control to a specific issue description, risk severity level, remediation recommendation, and originating requirement ID. '
        'Frame the recommendations so they are immediately actionable by engineering, security, or compliance teams.'
    ),
}

EXAMPLE_ANSWERS: Dict[str, Any] = {
    'q1': 'Security & Protection',
    'q2': ['Family safety', 'Property security'],
    'q3': 'Important',
    'q4': 'Limited remote access',
    'q5': 'Primary Residence',
    'q6': '1,500 - 3,000 sq ft',
    'q7': 'Family with children',
    'q8': ['Data privacy', 'Network security'],
    'q9': '2FA',
    'q10': 'Role-based access',
    'q11': 'Critical notifications',
    'q12': 'Important',
    'q13': 'Independent audits',
    'q14': '4-5 years',
    'q15': ['Poor privacy policy', 'Lack of software updates'],
}


def render_prompt(prompt_key: str, answers: Dict[str, Any]) -> str:
    """Render a workflow prompt with the questionnaire answers inserted."""
    prompt_template = PROMPTS.get(prompt_key)
    if not prompt_template:
        raise KeyError(f'Unknown prompt key: {prompt_key}')

    return (
        f"{prompt_template}\n\n"
        f"QUESTIONNAIRE ANSWERS:\n{answers}\n\n"
        f"Please produce the output for stage '{prompt_key}'."
    )


def main() -> None:
    print('# SECURER-COMPLIANCE-V1 Prompt Workflow Reference')
    print('This file contains the five workflow prompts used for the project.')
    print()
    for key, prompt in PROMPTS.items():
        print(f'---\nSTAGE: {key}\n')
        print(render_prompt(key, EXAMPLE_ANSWERS))
        print()


if __name__ == '__main__':
    main()
