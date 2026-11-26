"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { useAudio } from "@/hooks/useAudio";
import { cn } from "@/lib/utils";
import type {
  ChallengeOutcome,
  DragOption,
  DragTarget,
  FeedbackTone,
} from "@/types/game";

type DragDropBoardProps = {
  prompt: string;
  options: DragOption[];
  targets: DragTarget[];
  onLifeLost: () => void;
  onFeedback: (message: string, tone: FeedbackTone) => void;
  onComplete: (outcome: ChallengeOutcome) => void;
};

function DraggableOption({
  option,
  disabled,
  selected,
  onSelect,
}: {
  option: DragOption;
  disabled: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: option.id, disabled });
  const style: CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    touchAction: "none",
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => onSelect(option.id)}
      className={cn(
        "focus-ring flex w-full touch-none items-center gap-3 rounded-2xl border-2 bg-white px-3 py-2 text-left text-sm font-bold shadow-card transition",
        selected ? "border-leaf-500 ring-2 ring-leaf-200" : "border-leaf-100",
        disabled && "cursor-default opacity-40",
        isDragging && "z-20 opacity-70",
      )}
    >
      <AssetImage assetKey={option.assetKey} alt={option.label} width={44} height={44} />
      <span>{option.label}</span>
    </button>
  );
}

function DroppableTarget({
  target,
  option,
  isOver,
  setNodeRef,
  onClick,
}: {
  target: DragTarget;
  option?: DragOption;
  isOver: boolean;
  setNodeRef: (node: HTMLElement | null) => void;
  onClick: () => void;
}) {
  const assetKey = option?.assetKey ?? target.assetKey;
  return (
    <div
      ref={setNodeRef}
      role="button"
      tabIndex={0}
      aria-label={`${target.label}. ${target.description}${option ? ` Terisi ${option.label}` : ""}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "focus-ring flex min-h-[8rem] flex-col items-center gap-2 rounded-2xl border-2 border-dashed p-3 text-center transition",
        isOver ? "border-leaf-500 bg-leaf-50" : "border-leaf-200 bg-white/70",
        option && "border-solid border-leaf-400",
      )}
    >
      {assetKey ? (
        <AssetImage assetKey={assetKey} alt={option?.label ?? target.label} width={56} height={56} />
      ) : null}
      <span className="font-heading text-base font-bold text-leaf-800">
        {option?.label ?? target.label}
      </span>
      <span className="text-xs leading-snug text-ink-500">
        {option ? "Tepat!" : target.description}
      </span>
    </div>
  );
}

export function DragDropBoard({
  prompt,
  options,
  targets,
  onLifeLost,
  onFeedback,
  onComplete,
}: DragDropBoardProps) {
  const { playSfx } = useAudio();
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const completedRef = useRef(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } }),
    useSensor(KeyboardSensor),
  );

  const usedOptionIds = new Set(Object.values(assignments));
  const filledCount = targets.filter((target) => assignments[target.id]).length;

  useEffect(() => {
    if (filledCount !== targets.length || completedRef.current) return;
    completedRef.current = true;
    onComplete({
      earned: targets.length * 10,
      possible: targets.length * 10,
      correct: targets.length,
      total: targets.length,
    });
  }, [filledCount, targets.length, onComplete]);

  const attempt = (optionId: string | null, targetId: string) => {
    if (completedRef.current) return;
    if (!optionId) {
      onFeedback("Pilih molekul dulu, lalu klik tujuannya.", "info");
      return;
    }
    if (assignments[targetId]) {
      onFeedback("Tempat ini sudah terisi. Coba tujuan lain.", "info");
      return;
    }
    if (usedOptionIds.has(optionId)) {
      onFeedback("Molekul itu sudah dipakai.", "info");
      return;
    }
    const target = targets.find((item) => item.id === targetId);
    if (!target) return;
    if (target.accepts.includes(optionId)) {
      setAssignments((previous) => ({ ...previous, [targetId]: optionId }));
      setSelectedId(null);
      playSfx("sfxBenar");
      onFeedback("Benar! Jalur sudah tepat.", "success");
      return;
    }
    setSelectedId(null);
    onLifeLost();
    playSfx("sfxSalah");
    onFeedback("Belum tepat. Pikirkan fungsi jalur itu.", "error");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const optionId = String(event.active.id);
    const targetId = event.over ? String(event.over.id) : null;
    if (targetId) attempt(optionId, targetId);
  };

  return (
    <motion.div
      className="mx-auto max-w-4xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="mb-4 text-center text-sm font-semibold text-ink-700 sm:text-base">
        {prompt}
      </p>
      <p className="mb-5 text-center text-xs text-ink-500">
        Boleh seret dengan jari/mouse, atau klik pilihan lalu klik tujuan.
      </p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-nature">
            <h3 className="mb-3 font-heading text-lg font-bold text-leaf-800">Pilihan</h3>
            <div className="grid gap-2">
              {options.map((option) => (
                <DraggableOption
                  key={option.id}
                  option={option}
                  disabled={usedOptionIds.has(option.id)}
                  selected={selectedId === option.id}
                  onSelect={(id) => {
                    playSfx("sfxKlik");
                    setSelectedId(id);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {targets.map((target) => {
              const assignedId = assignments[target.id];
              const option = options.find((item) => item.id === assignedId);
              return (
                <TargetRenderer
                  key={target.id}
                  target={target}
                  option={option}
                  onClick={() => attempt(selectedId, target.id)}
                />
              );
            })}
          </div>
        </div>
      </DndContext>
    </motion.div>
  );
}

function TargetRenderer({
  target,
  option,
  onClick,
}: {
  target: DragTarget;
  option?: DragOption;
  onClick: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: target.id });
  return (
    <DroppableTarget
      target={target}
      option={option}
      isOver={isOver}
      setNodeRef={setNodeRef}
      onClick={onClick}
    />
  );
}
