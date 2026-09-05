import React, { ElementType } from "react";
import styles from "./style.module.scss";

export interface PerspectiveTextProps extends React.HTMLAttributes<HTMLElement> {
    /** Primary text to display. Can also be passed as children */
    label?: string;
    /** Content to display. Overrides label if both are provided */
    children?: React.ReactNode;
    /**
     * Optional secondary text/content to display on the rolled layer.
     * Defaults to the same text/content as primary.
     */
    secondaryLabel?: React.ReactNode;
    /** Custom CSS class for the root container */
    className?: string;
    /** Custom CSS class for the primary (initial) text layer */
    primaryClassName?: string;
    /** Custom CSS class for the secondary (revealed) text layer */
    secondaryClassName?: string;
    /** Optional boolean to externally control the active/hover roll state */
    isHovered?: boolean;
    /** Roll direction: "up" (rolls upwards) or "down" (rolls downwards). Default is "up". */
    direction?: "up" | "down";
    /** The HTML element to render as the root container. Defaults to "span" for inline safety. */
    as?: ElementType;
}

export default function PerspectiveText({
    label,
    children,
    secondaryLabel,
    className = "",
    primaryClassName = "",
    secondaryClassName = "",
    isHovered,
    direction = "up",
    as: Component = "span",
    ...rest
}: PerspectiveTextProps) {
    const primaryContent = children ?? label ?? "";
    const secondaryContent = secondaryLabel ?? primaryContent;

    const activeClass =
        isHovered !== undefined ? (isHovered ? styles.active : "") : "";
    const directionClass = direction === "down" ? styles.down : styles.up;

    return (
        <Component
            className={`${styles.perspectiveContainer} ${className}`}
            {...rest}
        >
            <span
                className={`${styles.roll} ${directionClass} ${activeClass}`}
            >
                <span className={`${styles.primary} ${primaryClassName}`}>
                    {primaryContent}
                </span>
                <span
                    aria-hidden="true"
                    className={`${styles.secondary} ${secondaryClassName}`}
                >
                    {secondaryContent}
                </span>
            </span>
        </Component>
    );
}