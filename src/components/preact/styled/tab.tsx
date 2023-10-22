/** @jsxImportSource preact */

import { type ComponentProps, createElement, type ComponentType } from "preact";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { Children } from "preact/compat";

// Sub-Components
import {
  DButton,
  DDiv,
} from "@/components/preact/primitive/default-components";
import {
  SegmentedControl,
  type SegmentedControlProps,
} from "@/components/preact/styled/segmented-control";

/* ------ Internal ------ */

interface TabItemProps {
  id: string;
  children: JSX.Element[] | JSX.Element;
  title: string;
  icon?: JSX.Element;
  index: number;
}

interface TabPropsBase<T extends ComponentType<T>> {
  wrapperComponent?: T;
}

type TabProps<T extends ComponentType<T>> = TabPropsBase<T> &
  Omit<ComponentProps<T>, keyof TabPropsBase<T>>;

type TabItemInternalProps = Omit<TabItemProps, "title">;

const TabItemInternal = ({ children, id }: TabItemInternalProps) => {
  return (
    <div
      data-pos="initial" // Values: initial - center - left - right
      id={`tab-item-${id}`}
      className={[
        "rounded-[calc(theme(borderRadius.3xl)_-_theme(spacing.3))]",
        "overflow-hidden",
        "[transition:_transform_300ms,_opacity_300ms]",
        "ease-elastic",
        "duration-300",
        "w-[calc(100%_-_theme(space.6))]",
        "m-3",
        "opacity-0",
        // Initial states
        "[&:not([data-pos=initial])]:absolute",
        "data-[pos=initial]:first:static",
        "data-[pos=initial]:first:opacity-100",
        "data-[pos=initial]:absolute",
        "data-[pos=initial]:opacity-0",
        "data-[pos=initial]:pointer-events-none",
        // Hydrated states
        "data-[pos=center]:opacity-100",
        "data-[pos=center]:translate-x-0",
        "motion-safe:data-[pos=left]:translate-x-[-100%]",
        "motion-safe:data-[pos=right]:translate-x-[100%]",
        "data-[pos=right]:pointer-events-none",
        "data-[pos=left]:pointer-events-none",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

/* ------ Exported ------ */

export const TabItem = (_: Omit<TabItemProps, "index">) => <></>;

export const Tab = <T extends ComponentType<any> = typeof DDiv>({
  wrapperComponent,
  children,
  ...props
}: TabProps<T>) => {
  const itemsWrapperRef = useRef<null | HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const firstRenderRef = useRef(true);

  const { tabHeaders, tabItems, idToIndex } = useMemo(() => {
    /** Tab headers in form of an array */
    const tabHeaders: SegmentedControlProps<typeof DButton>["items"] = [];

    /** Tab contents in form of an array */
    const tabItems: TabItemInternalProps[] = [];

    /** Map of tabs id's to their indexes */
    const idToIndex: Map<string, number> = new Map();

    (
      Children.toArray(children) as unknown as { props: TabItemProps }[]
    ).forEach(({ props: { children, id, title, icon } }, index) => {
      tabItems.push({ id, index, children });
      tabHeaders.push({ id, children: title, iconLeft: icon });
      idToIndex.set(id, index);
      if (index === 0) {
        setSelectedTab(id);
      }
    });

    return { tabHeaders, tabItems, idToIndex };
  }, [children]);

  const onSelect = useCallback(
    (id: string) => {
      const items = itemsWrapperRef.current;
      const activeItemIndex = idToIndex.get(id);

      if (items === null || typeof activeItemIndex === "undefined") return;

      // Looping through the tab items
      (items.childNodes as unknown as HTMLDivElement[]).forEach(
        (child, index) => {
          // Incase the current item is the active item
          if (activeItemIndex === index) {
            const { height } = child.getBoundingClientRect();
            child.setAttribute("data-pos", "center");
            items.style.setProperty("--height", height + "px");

            return;
          }

          // Incase this item is before active item
          if (activeItemIndex < index) {
            child.setAttribute("data-pos", "right");
            return;
          }

          // Incase this item is after active item
          if (activeItemIndex > index) {
            child.setAttribute("data-pos", "left");
            return;
          }
        }
      );

      // Storing the active tab
      setSelectedTab(id);
    },
    [idToIndex]
  );

  // Sets up a `ResizeObserver` to resize the tab, incase of resize in it's content
  const setupResizeObserver = useCallback(() => {
    if (resizeObserverRef.current !== null) return;

    const { current: wrapper } = itemsWrapperRef;

    resizeObserverRef.current = new ResizeObserver((entries) =>
      entries.forEach((entry) => {
        const isCentered = entry.target.getAttribute("data-pos") === "center";

        if (isCentered) onSelect(entry.target.id.replace("tab-item-", ""));
      })
    );

    const { current: observer } = resizeObserverRef;
    if (wrapper !== null) {
      wrapper.childNodes.forEach((node) =>
        observer.observe(node as HTMLElement)
      );
    }
  }, [onSelect]);

  // Hydrating the component
  useEffect(() => {
    if (firstRenderRef.current) {
      // @ts-ignore
      onSelect(tabHeaders[0].id);
      firstRenderRef.current = false;
      setupResizeObserver();
    }
  }, [tabHeaders, onSelect, setupResizeObserver]);

  return createElement(
    wrapperComponent ? wrapperComponent : DDiv,
    props,
    <>
      <SegmentedControl
        selected={selectedTab}
        onSelected={onSelect}
        buttonComponents={DButton}
        items={tabHeaders}
        className="border w-full border-neutral-200 dark:border-neutral-800 [&_button]:grow p-1"
      />
      <div
        className={[
          "mt-3",
          "border",
          "[transition:_height_300ms_ease-in-out]",
          "rounded-3xl",
          "border-neutral-200",
          "dark:border-neutral-800",
          "bg-neutral-100",
          "dark:bg-neutral-900",
          "overflow-hidden",
          "relative h-[calc(var(--height,_auto)_+_theme(space.6)_+_2px)]",
        ].join(" ")}
        ref={itemsWrapperRef}
      >
        {tabItems.map((props) => (
          <TabItemInternal key={props.id} {...props} />
        ))}
      </div>
    </>
  );
};
