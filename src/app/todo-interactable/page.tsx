"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { TodoDashboard } from "@/components/interactable/todo-dashboard";
import { TamboProvider } from "@tambo-ai/react";

export default function TodoInteractablePage() {
  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={[]}
      tools={[]}
    >
      <div className="h-screen flex">
        <div className="flex-1">
          <TodoDashboard />
        </div>
        
        <div className="w-80 border-l border-gray-200">
          <MessageThreadFull contextKey="todo-interactable" />
        </div>
      </div>
    </TamboProvider>
  );
}
