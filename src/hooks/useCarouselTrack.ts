"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

export type CarouselStepMode = "item" | "page";

export interface CarouselTrackItem<T> {
  item: T;
  key: string;
  logical: number;
  absolute: number;
  set: number;
}

export interface UseCarouselTrackOptions<T> {
  items: T[];
  getKey: (item: T, logical: number) => string;
  cardSelector: string;
  infinite?: boolean;
  stepMode?: CarouselStepMode;
  cloneSets?: number;
  gapClassName?: string;
}

const DRAG_THRESHOLD = 6;
const SETTLE_FALLBACK_MS = 500;

function mod(n: number, m: number) {
  if (m <= 0) return 0;
  return ((n % m) + m) % m;
}

function directedDelta(
  fromLogical: number,
  toLogical: number,
  direction: -1 | 1,
  count: number,
) {
  if (count <= 0) return 0;
  if (direction > 0) {
    const d = mod(toLogical - fromLogical, count);
    return d === 0 ? count : d;
  }
  const d = mod(fromLogical - toLogical, count);
  return d === 0 ? count : d;
}

export function useCarouselTrack<T>({
  items,
  getKey,
  cardSelector,
  infinite = true,
  stepMode = "item",
  cloneSets = 3,
  gapClassName = "gap-6",
}: UseCarouselTrackOptions<T>) {
  const count = items.length;
  const sets = infinite && count > 0 ? Math.max(3, cloneSets) : 1;
  const middleSet = Math.floor(sets / 2);

  const trackRef = useRef<HTMLUListElement>(null);
  const absoluteRef = useRef(middleSet * Math.max(count, 1));
  const animatingRef = useRef(false);
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragState = useRef({
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    moved: false,
  });
  const readyRef = useRef(false);

  const [activeLogical, setActiveLogical] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(1);

  const loopedItems = useMemo<CarouselTrackItem<T>[]>(() => {
    if (count === 0) return [];
    return Array.from({ length: sets }, (_, set) =>
      items.map((item, logical) => ({
        item,
        logical,
        set,
        absolute: set * count + logical,
        key: `${set}-${getKey(item, logical)}`,
      })),
    ).flat();
  }, [count, getKey, items, sets]);

  const pageCount = Math.max(1, Math.ceil(count / Math.max(pageSize, 1)));

  const getCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [] as HTMLElement[];
    return Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
  }, [cardSelector]);

  const measurePageSize = useCallback(() => {
    const track = trackRef.current;
    const cards = getCards();
    if (!track || cards.length === 0) return 1;
    const cardWidth = cards[0].getBoundingClientRect().width;
    if (cardWidth <= 0) return 1;
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const stride = cardWidth + gap;
    return Math.max(1, Math.floor((track.clientWidth + gap) / stride));
  }, [getCards]);

  const scrollToAbsolute = useCallback(
    (absolute: number, smooth: boolean) => {
      const track = trackRef.current;
      const cards = getCards();
      const card = cards[absolute];
      if (!track || !card) return;

      const left = card.offsetLeft - track.offsetLeft;

      if (!smooth) {
        track.classList.remove("scroll-smooth");
        track.style.scrollBehavior = "auto";
        track.scrollLeft = left;
        // Force reflow before restoring smooth so browsers don't animate the jump
        void track.offsetWidth;
        track.style.scrollBehavior = "";
        track.classList.add("scroll-smooth");
      } else {
        track.classList.add("scroll-smooth");
        track.style.scrollBehavior = "";
        track.scrollTo({ left, behavior: "smooth" });
      }
    },
    [getCards],
  );

  const applyLogicalState = useCallback(
    (logical: number, size: number) => {
      setActiveLogical(logical);
      const pages = Math.max(1, Math.ceil(count / Math.max(size, 1)));
      setActivePage(Math.floor(logical / Math.max(size, 1)) % pages);
    },
    [count],
  );

  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;
    const cards = getCards();
    if (cards.length === 0) return;

    let nearest = 0;
    let nearestDist = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = index;
      }
    });

    absoluteRef.current = nearest;
    const logical = mod(nearest, count);
    const size = measurePageSize();
    setPageSize(size);
    applyLogicalState(logical, size);
  }, [applyLogicalState, count, getCards, measurePageSize]);

  const normalizeIfNeeded = useCallback(() => {
    if (!infinite || count === 0) {
      syncFromScroll();
      return;
    }

    const absolute = absoluteRef.current;
    const logical = mod(absolute, count);
    const middleAbsolute = middleSet * count + logical;

    if (absolute !== middleAbsolute) {
      absoluteRef.current = middleAbsolute;
      scrollToAbsolute(middleAbsolute, false);
    }

    const size = measurePageSize();
    setPageSize(size);
    applyLogicalState(logical, size);
  }, [
    applyLogicalState,
    count,
    infinite,
    measurePageSize,
    middleSet,
    scrollToAbsolute,
    syncFromScroll,
  ]);

  const clearSettleTimer = useCallback(() => {
    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  }, []);

  const afterScrollSettle = useCallback(
    (onDone: () => void) => {
      const track = trackRef.current;
      clearSettleTimer();

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        track?.removeEventListener("scrollend", onScrollEnd);
        clearSettleTimer();
        onDone();
      };

      function onScrollEnd() {
        finish();
      }

      if (track && "onscrollend" in window) {
        track.addEventListener("scrollend", onScrollEnd, { once: true });
      }

      settleTimerRef.current = setTimeout(finish, SETTLE_FALLBACK_MS);
    },
    [clearSettleTimer],
  );

  const jumpToLogical = useCallback(
    (logical: number, smooth: boolean) => {
      if (count === 0) return;
      const target = mod(logical, count);
      const absolute = (infinite ? middleSet * count : 0) + target;
      absoluteRef.current = absolute;
      const size = measurePageSize();
      setPageSize(size);
      applyLogicalState(target, size);
      scrollToAbsolute(absolute, smooth);
    },
    [
      applyLogicalState,
      count,
      infinite,
      measurePageSize,
      middleSet,
      scrollToAbsolute,
    ],
  );

  useEffect(() => {
    if (count === 0) return;

    const frame = requestAnimationFrame(() => {
      const size = measurePageSize();
      setPageSize(size);
      jumpToLogical(0, false);
      readyRef.current = true;
    });

    const onResize = () => {
      const size = measurePageSize();
      setPageSize(size);
      jumpToLogical(mod(absoluteRef.current, count), false);
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [count, jumpToLogical, measurePageSize]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (animatingRef.current || draggingRef.current) return;
      syncFromScroll();
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [syncFromScroll]);

  useEffect(() => () => clearSettleTimer(), [clearSettleTimer]);

  const go = useCallback(
    (direction: -1 | 1) => {
      if (count === 0 || animatingRef.current) return;

      const size = Math.max(1, stepMode === "page" ? measurePageSize() : 1);
      setPageSize(size);
      const pages = Math.max(1, Math.ceil(count / size));

      const currentLogical = mod(absoluteRef.current, count);
      let nextLogical: number;

      if (stepMode === "page") {
        const currentPage = Math.floor(currentLogical / size);
        const nextPage = mod(currentPage + direction, pages);
        nextLogical = nextPage * size;
      } else {
        nextLogical = mod(currentLogical + direction, count);
      }

      let nextAbsolute: number;
      if (infinite) {
        const delta = directedDelta(currentLogical, nextLogical, direction, count);
        nextAbsolute = absoluteRef.current + direction * delta;
      } else {
        nextAbsolute = nextLogical;
        nextAbsolute = Math.min(Math.max(0, nextAbsolute), Math.max(0, count - 1));
      }

      animatingRef.current = true;
      absoluteRef.current = nextAbsolute;
      applyLogicalState(nextLogical, size);
      scrollToAbsolute(nextAbsolute, true);

      afterScrollSettle(() => {
        syncFromScroll();
        normalizeIfNeeded();
        animatingRef.current = false;
      });
    },
    [
      afterScrollSettle,
      applyLogicalState,
      count,
      infinite,
      measurePageSize,
      normalizeIfNeeded,
      scrollToAbsolute,
      stepMode,
      syncFromScroll,
    ],
  );

  const goToLogical = useCallback(
    (logical: number) => {
      if (count === 0 || animatingRef.current) return;
      animatingRef.current = true;
      jumpToLogical(logical, true);
      afterScrollSettle(() => {
        normalizeIfNeeded();
        animatingRef.current = false;
      });
    },
    [afterScrollSettle, count, jumpToLogical, normalizeIfNeeded],
  );

  const goToPage = useCallback(
    (page: number) => {
      const size = Math.max(1, measurePageSize());
      setPageSize(size);
      goToLogical(mod(page, Math.max(1, Math.ceil(count / size))) * size);
    },
    [count, goToLogical, measurePageSize],
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLUListElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const track = trackRef.current;
      if (!track) return;

      draggingRef.current = true;
      suppressClickRef.current = false;
      dragState.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startScroll: track.scrollLeft,
        moved: false,
      };
      track.setPointerCapture(event.pointerId);
      track.classList.remove("scroll-smooth");
      track.style.scrollBehavior = "auto";
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLUListElement>) => {
      if (!draggingRef.current) return;
      if (event.pointerId !== dragState.current.pointerId) return;
      const track = trackRef.current;
      if (!track) return;

      const dx = event.clientX - dragState.current.startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) {
        dragState.current.moved = true;
        suppressClickRef.current = true;
      }
      track.scrollLeft = dragState.current.startScroll - dx;
    },
    [],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLUListElement>) => {
      if (!draggingRef.current) return;
      if (event.pointerId !== dragState.current.pointerId) return;

      const track = trackRef.current;
      draggingRef.current = false;

      if (track?.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }

      track?.classList.add("scroll-smooth");
      if (track) track.style.scrollBehavior = "";

      syncFromScroll();
      if (infinite) normalizeIfNeeded();

      if (dragState.current.moved) {
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }
    },
    [infinite, normalizeIfNeeded, syncFromScroll],
  );

  const onClickCapture = useCallback((event: ReactMouseEvent) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }, []);

  const dragHandlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onClickCapture,
  };

  const trackClassName = [
    "flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2",
    gapClassName,
    "cursor-grab active:cursor-grabbing touch-pan-y select-none",
    "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  ].join(" ");

  return {
    trackRef,
    loopedItems,
    activeLogical,
    activePage,
    pageSize,
    pageCount,
    go,
    goToLogical,
    goToPage,
    dragHandlers,
    trackClassName,
  };
}
