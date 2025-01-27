import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { gsap } from "gsap"


export default function Skills() {
    const chartRef = useRef(null);
    const datasets = [
        [
            { axis: "Programming Languages", value: 0.93 },
            { axis: "Front-End Development", value: 0.85 },
            { axis: "Back-End Development", value: 0.8 },
            { axis: "Soft Skills", value: 0.93 },
            { axis: "Tools & Technologies", value: 0.85 },
        ],
        [
            { axis: "HTML", value: 0.9 },
            { axis: "CSS", value: 0.8 },
            { axis: "Tailwind CSS", value: 0.8 },
            { axis: "React.js", value: 0.85 },
            { axis: "Next.js", value: 0.8 },
        ],
        [
            { axis: "Node.js", value: 0.85 },
            { axis: "SQL", value: 0.8 },
            { axis: "MSSQL", value: 0.85 },
            { axis: "MySQL", value: 0.75 },
            { axis: "Next.js", value: 0.87 },
            { axis: "Java Spring Boot", value: 0.75 },
        ],
        [
            { axis: "English Communication", value: 0.9 },
            { axis: "French Communication", value: 0.92 },
            { axis: "Teamwork", value: 0.95 },
            { axis: "Adaptability", value: 0.94 },
            { axis: "Problem-Solving", value: 0.9 },
        ],
        [
            { axis: "Git", value: 0.9 },
            { axis: "Azure", value: 0.88 },
            { axis: "Azure DevOps", value: 0.85 },
            { axis: "VSCode", value: 0.95 },
            { axis: "Eclipse", value: 0.9 },
            { axis: "Netbeans", value: 0.8 },
        ],
        [
            { axis: "Java", value: 0.94 },
            { axis: "JavaScript", value: 0.92 },
            { axis: "Python", value: 0.85 },
            { axis: "C", value: 0.85 },
            { axis: "AL", value: 0.88 },
        ],
    ];


    const viewBoxWidth = 600;
    const viewBoxHeight = 600;
    // const levels = 5; // Number of grid levels
    const graphMaxValue = 1;

    const startAnimation = () => {
        const svg = d3
            .select(chartRef.current)
            .append("svg")
            .attr("width", viewBoxWidth)
            .attr("height", viewBoxHeight)
            .append("g")
            .attr("transform", `translate(${viewBoxWidth / 2}, ${viewBoxHeight / 2})`);

        const radius = Math.min(viewBoxWidth, viewBoxHeight) / 2 - 50;
        const radiusScale = d3.scaleLinear().domain([0, graphMaxValue]).range([0, radius]);
        const angleSlice = (Math.PI * 2) / datasets[0].length;

        let isPaused = false; // Animation pause flag

        // Draw initial points
        const drawPoints = (data) => {
            svg.selectAll("circle.point")
                .data(data)
                .join("circle")
                .attr("class", "point")
                .attr("r", 5)
                .attr("fill", "blue")
                .attr("cx", (d, i) => radiusScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
                .attr("cy", (d, i) => radiusScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2));
        };

        // Move a single point to origin and update the path
        const moveSinglePointToOrigin = (data, index) => {
            return new Promise((resolve) => {
                // Update the `value` for the current point to `0` temporarily
                const updatedData = data.map((d, i) =>
                    i === index ? { ...d, value: 0 } : d
                );

                // Animate the current point to the origin
                svg.selectAll("circle.point")
                    .filter((_, i) => i === index)
                    .transition()
                    .duration(500)
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .on("end", resolve); // Resolve after the animation completes

                // Update the path dynamically to reflect the concave shape
                svg.select("path.radar")
                    .datum(updatedData)
                    .transition()
                    .duration(500)
                    .attr("d", d3.lineRadial()
                        .radius((d) => radiusScale(d.value))
                        .angle((_, i) => i * angleSlice)
                        .curve(d3.curveLinearClosed)
                    );
            });
        };

        // Move all points to the origin sequentially
        const movePointsToOrigin = (data) => {
            return data.reduce(
                (promise, _, i) => promise.then(() => moveSinglePointToOrigin(data, i)),
                Promise.resolve()
            );
        };

        // Move points outward and fill the path
        const movePointsOutward = (data) => {
            const pointsPromise = new Promise((resolve) => {
                svg.selectAll("circle.point")
                    .data(data)
                    .transition()
                    .duration(500)
                    .delay((_, i) => i * 200) // Staggered delay
                    .attr("cx", (d, i) => radiusScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
                    .attr("cy", (d, i) => radiusScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
                    .on("end", (_, i) => {
                        if (i === data.length - 1) resolve(); // Resolve after the last point finishes
                    });
            });

            const pathPromise = new Promise((resolve) => {
                svg.select("path.radar")
                    .datum(data)
                    .transition()
                    .duration(1000) // Ensure the path animation matches the points
                    .attr("d", d3.lineRadial()
                        .radius((d) => radiusScale(d.value))
                        .angle((_, i) => i * angleSlice)
                        .curve(d3.curveLinearClosed)
                    )
                    .on("end", resolve); // Resolve after the path finishes
            });

            return Promise.all([pointsPromise, pathPromise]);
        };

        // Draw and animate the radar chart for all datasets
        const animateRadarChart = async () => {
            for (let i = 0; i < datasets.length; i++) {
                if (isPaused) return; // Pause animation if the flag is set

                const currentData = datasets[i];

                // Draw points for the first dataset
                if (i === 0) drawPoints(currentData);

                // Remove old path
                svg.selectAll("path.radar").remove();

                // Draw a new path starting from the origin
                svg.append("path")
                    .datum(currentData)
                    .attr("class", "radar")
                    .attr("d", d3.lineRadial()
                        .radius((d) => 0) // Start from origin
                        .angle((_, i) => i * angleSlice)
                        .curve(d3.curveLinearClosed)
                    )
                    .attr("fill", "rgba(0, 128, 255, 0.3)")
                    .attr("stroke", "blue")
                    .attr("stroke-width", 2);

                // Move points to the origin sequentially while updating the path
                await movePointsToOrigin(currentData);

                // Move points outward and animate the path simultaneously
                await movePointsOutward(currentData);
            }

            // Restart animation
            animateRadarChart();
        };

        // Pause and resume animation on hover
        svg.on("mouseover", () => {
            isPaused = true; // Pause animation
        });
        svg.on("mouseout", () => {
            if (isPaused) {
                isPaused = false; // Resume animation
                animateRadarChart();
            }
        });

        // Start the animation
        animateRadarChart();
    };



    useEffect(() => {
        startAnimation();
        return () => d3.select(chartRef.current).selectAll("*").remove();
    }, []);

    return (
        <div id="skills" className="transition-all">
            <h1 className="flex text-5xl justify-center m-12">Skills</h1>
            <div className="flex flex-row justify-center items-center">
                <div ref={chartRef} className="flex justify-center items-center w-1/2"></div>
                <div id="Skills Dashboard" className="w-1/2 h-1"></div>
            </div>
        </div >
    );
}