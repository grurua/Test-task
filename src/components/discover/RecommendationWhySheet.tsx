import { BottomSheet } from "./BottomSheet";
import { RecommendationExplanation } from "./RecommendationExplanation";
import { useAppState } from "../../state/AppStateContext";
import type { Recommendation } from "../../types";

interface RecommendationWhySheetProps {
  recommendation: Recommendation | null;
  onClose: () => void;
}

export function RecommendationWhySheet({
  recommendation,
  onClose,
}: RecommendationWhySheetProps) {
  const { optOutRecommendationType } = useAppState();

  return (
    <BottomSheet open={Boolean(recommendation)} onClose={onClose} title="Why you're seeing this">
      {recommendation ? (
        <RecommendationExplanation
          reason={recommendation.reason}
          onGotIt={onClose}
          onOptOut={() => {
            optOutRecommendationType(recommendation.type);
            onClose();
          }}
        />
      ) : null}
    </BottomSheet>
  );
}
