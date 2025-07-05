// app/playground/page.tsx

import ButtonPlayground from "@/components/playground/buttonPlayground";
import {
  DesignSystemContainer,
  DesignSystemHeader,
  Title,
} from "@/components/playground/components";

export default function PlaygroundPage() {
  return (
    <DesignSystemContainer>
      {/* Header */}
      <DesignSystemHeader>
        <Title>Design System</Title>
      </DesignSystemHeader>

      {/* Component Section */}
      <ButtonPlayground />
    </DesignSystemContainer>
  );
}
