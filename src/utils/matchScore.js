// src/utils/matchScore.js

/**
 * Compute a 0–100 match score between a plan (user preferences)
 * and a package. Higher = better match.
 *
 * Weights:
 *   Category   30
 *   Budget     25
 *   Location   20
 *   Duration   15
 *   Difficulty 10
 *
 * Unset preferences contribute their full weight (no penalty),
 * so a plan with no preferences gives every package a score of 100.
 */
export  function calculateMatchScore(plan, pkg) {
  if (!plan || !pkg) return 0;

  let score = 0;

  // Category — 30
  if (!plan.category || plan.category === pkg.category) {
    score += 30;
  }

  // Budget — 25
  if (plan.budget_min == null && plan.budget_max == null) {
    score += 25;
  } else {
    const price = Number(pkg.price);
    const min = plan.budget_min ?? 0;
    const max = plan.budget_max ?? Infinity;
    if (price >= min && price <= max) {
      score += 25;
    }
  }

  // Location — 20
  if (!plan.location) {
    score += 20;
  } else if (
    (pkg.location ?? "").toLowerCase().includes(plan.location.trim().toLowerCase())
  ) {
    score += 20;
  }

  // Duration — 15
  if (!plan.duration) {
    score += 15;
  } else {
    const days = parseInt(pkg.duration, 10);
    if (!isNaN(days)) {
      const bucket = days <= 7 ? "short" : days <= 14 ? "medium" : "long";
      if (bucket === plan.duration) {
        score += 15;
      }
    }
  }

  // Difficulty — 10
  if (!plan.difficulty || plan.difficulty === pkg.difficulty) {
    score += 10;
  }

  return score;
}