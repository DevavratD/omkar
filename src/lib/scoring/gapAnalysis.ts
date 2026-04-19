// ─── Gap Analysis ──────────────────────────────────────────────────────────────
//
// Compares psychometric domain scores vs aptitude domain scores for the same domain.
//
// Rules (spec-exact):
//  Both high (≥60)       → "Aligned Strength"
//  Psych high, Apt low   → "Interest present, ability needs development"
//  Apt high, Psych low   → "Capability present, but not strongly preferred"
//  Both low              → "Not a current fit"
//
// Gap magnitude and priority are factual arithmetic — no inference.

import { GapEntry, GapStatus, GapPriority, PsychDomainScore, AptDomainScore } from './types';

function getGapPriority(magnitude: number): GapPriority {
  if (magnitude >= 30) return 'High';
  if (magnitude >= 15) return 'Medium';
  return 'Low';
}

function buildGapMessage(
  type: GapStatus,
  domain: string,
  p: number,
  a: number,
  magnitude: number,
  priority: GapPriority
): string {
  if (type === 'aligned') {
    return `Both interest (${p}) and ability (${a}) are strong for ${domain} — this is a well-aligned area.`;
  }

  if (type === 'interest_high_ability_low') {
    const priorityNote =
      priority === 'High'
        ? 'This represents a meaningful development opportunity that can be improved with focused practice.'
        : priority === 'Medium'
        ? 'With some focused effort, this gap is very closeable.'
        : 'A minor gap — continued engagement will naturally close this.';
    return `Interest in ${domain} scores ${p}, while current ability scores ${a} (a ${magnitude}-point difference). ${priorityNote}`;
  }

  if (type === 'ability_high_interest_low') {
    return `Ability in ${domain} scores ${a}, though interest currently scores ${p}. This latent capability may be worth exploring in conversation with the candidate.`;
  }

  return `${domain} shows limited alignment at this stage (interest: ${p}, ability: ${a}). This is not a priority area currently.`;
}

export function generateGapAnalysis(
  psychDomains: PsychDomainScore[],
  aptDomains: AptDomainScore[]
): GapEntry[] {
  const result: GapEntry[] = [];
  const aptMap = new Map<string, number>(aptDomains.map(d => [d.domain, d.score]));

  for (const pd of psychDomains) {
    const domain = pd.domain;
    const p = pd.score;
    const a = aptMap.get(domain) ?? 0;
    const gap_magnitude = Math.abs(p - a);
    const gap_priority = getGapPriority(gap_magnitude);

    let type: GapStatus;

    if (p >= 60 && a >= 60) {
      type = 'aligned';
    } else if (p >= 60 && a < 50) {
      type = 'interest_high_ability_low';
    } else if (p < 50 && a >= 60) {
      type = 'ability_high_interest_low';
    } else {
      type = 'low_fit';
    }

    result.push({
      domain,
      psychometric: p,
      aptitude: a,
      type,
      message: buildGapMessage(type, domain, p, a, gap_magnitude, gap_priority),
      gap_magnitude,
      gap_priority,
    });
  }

  return result.sort((a, b) => b.psychometric - a.psychometric);
}
