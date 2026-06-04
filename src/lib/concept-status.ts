import type { Concept } from "@/data/mock";

export function isConceptEnded(status: Concept["status"]) {
  return status === "ended";
}

export function getConceptStatusLabel(status: Concept["status"]) {
  if (status === "ended") return "Ended";
  if (status === "upcoming") return "Soon";
  if (status === "live") return "Live";
  return "Open";
}
