"use client"

import { useActionState, useState } from "react"
import { chatWithNotesAction } from "@/app/actions" // Tu Server Action
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X } from "lucide-react"

export function ChatInput() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // React 19: formAction maneja el estado de carga y la respuesta automáticamente
  const [state, formAction, isPending] = useActionState(chatWithNotesAction, {
    answer: "",
    error: null
  })

  return (
    <div className="w-full max-w-md mb-12">
      <motion.div layout className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden">
        {/* Usamos el nuevo estándar de formularios de React 19 */}
        <form action={formAction} className="p-2 flex items-center gap-2">
          <div className="pl-2">
            <Sparkles className="w-4 h-4 text-neutral-400" />
          </div>
          <input 
            name="query" // Importante para la Server Action
            type="text"
            onFocus={() => setIsExpanded(true)}
            placeholder="Chat with my notes..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-neutral-200"
          />
          {isExpanded && (
            <button 
              type="reset" // Limpia el form automáticamente
              onClick={() => setIsExpanded(false)}
              className="p-2 hover:bg-neutral-800 rounded-lg"
            >
              <X className="w-4 h-4 text-neutral-500" />
            </button>
          )}
        </form>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              className="px-4 pb-4 border-t border-neutral-800"
            >
              {isPending ? (
                <div className="pt-4 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.5s]" />
                </div>
              ) : (
                <div className="pt-4 text-sm text-neutral-400 leading-relaxed">
                  {state.answer || "I've read all your posts. Ask me anything!"}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}