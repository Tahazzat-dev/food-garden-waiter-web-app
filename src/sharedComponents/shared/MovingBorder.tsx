import { ReactNode } from "react";

type Props = {
    width?: number | undefined;
    height?: number | undefined;
    color?: string | undefined;
    duration?: string | undefined;
    children: ReactNode;
}
export default function MovingBorder({
    width = 450,
    height = 65,
    color = "red",
    children,
    duration = "8s" // Increased default from 4s to 8s for slower, more elegant movement
}: Props) {
    const borderRadius = 12;

    // The perimeter of a rounded rectangle for accurate dash-offset sync
    const perimeter = 2 * (width + height) - 8 * borderRadius + 2 * Math.PI * borderRadius;

    return (
        <div
            className="relative group transition-transform duration-500 pb-3 p-1.5 overflow-hidden bg-primary"
            style={{ width: `auto`, height: `${height}px` }}
        >
            {/* SVG Animation Layer */}
            <div className="absolute inset-0 -m-[2px] pointer-events-none">
                <svg
                    width={width + 4}
                    height={height + 4}
                    viewBox={`0 0 ${width + 4} ${height + 4}`}
                    fill="none"
                    className="overflow-visible"
                >
                    {/* Static border path */}
                    <path
                        d={`M ${borderRadius + 2},2 
                H ${width + 2 - borderRadius} 
                a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},${borderRadius} 
                V ${height + 2 - borderRadius} 
                a ${borderRadius},${borderRadius} 0 0 1 -${borderRadius},${borderRadius} 
                H ${borderRadius + 2} 
                a ${borderRadius},${borderRadius} 0 0 1 -${borderRadius},-${borderRadius} 
                V ${borderRadius + 2} 
                a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},-${borderRadius} 
                z`}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />

                    {/* The Moving Beam */}
                    <path
                        d={`M ${borderRadius + 2},2 
                H ${width + 2 - borderRadius} 
                a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},${borderRadius} 
                V ${height + 2 - borderRadius} 
                a ${borderRadius},${borderRadius} 0 0 1 -${borderRadius},${borderRadius} 
                H ${borderRadius + 2} 
                a ${borderRadius},${borderRadius} 0 0 1 -${borderRadius},-${borderRadius} 
                V ${borderRadius + 2} 
                a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},-${borderRadius} 
                z`}
                        stroke={color}
                        strokeWidth="4"
                        style={{
                            strokeDasharray: `${perimeter * 0.15} ${perimeter * 0.85}`,
                            strokeDashoffset: perimeter,
                            animation: `smoothTravel ${duration} linear infinite`,
                        }}
                    />
                </svg>
            </div>
            {
                children
            }
            <style>{`
        @keyframes smoothTravel {
          from { stroke-dashoffset: ${perimeter * 2}; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
        </div>
    );
};
