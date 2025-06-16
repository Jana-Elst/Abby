//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import React, { useRef, useEffect } from 'react'
import { getAngle, getISOLocalString, timeDiff } from '../../services/clock.js'
import { colors } from "../../services/museumData";

const Clock = ({ props, clock, className, canvasSize, clockColors }) => {
    const { color: colorName, bgColor: bgColorName } = clockColors;

    const canvasRef = useRef(null)
    let draw;

    let size;
    const strokeWidth = 6;

    const resizeCanvas = (canvas) => {
        const { width, height } = canvas.getBoundingClientRect()

        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio: ratio = 1 } = window
            const context = canvas.getContext('2d')
            canvas.width = width * ratio
            canvas.height = height * ratio
            context.scale(ratio, ratio)
            return true
        }

        return false
    }

    const handClock = (ctx, angle, relativeSize) => {
        ctx.save();
        ctx.translate(ctx.canvas.width - size, size);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.rotate(angle);
        ctx.lineTo(0, -size * relativeSize);
        ctx.lineWidth = strokeWidth / 2;
        ctx.strokeStyle = colors[colorName];
        ctx.stroke();
        ctx.restore();
    }

    const activeClockArc = (ctx, angle, clockwise = false, color) => {
        ctx.save();
        ctx.translate(size, size);
        ctx.rotate(-Math.PI / 2);
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, angle, clockwise);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    const activeClockTriangle = (ctx, angle, color) => {
        ctx.save();
        ctx.translate(size, size);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        ctx.rotate(angle);
        ctx.lineTo(0, -size);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    draw = (ctx) => {
        size = ctx.canvas.height / 2

        //-- background circle clock
        ctx.beginPath();
        ctx.arc(ctx.canvas.width - size, size, size, 0, 2 * Math.PI);
        ctx.fillStyle = colors[bgColorName];
        ctx.fill();

        //scheduled
        if (clock.startTime) {
            let timeNow = getISOLocalString();

            //if clock has a stopTime replace it with the stopTime
            if (clock.stopTime) {
                timeNow = clock.stopTime;
            }

            const timeDifference = timeDiff(clock.startTime, timeNow);
            const { angleMinutes, angleHours } = getAngle(timeDifference);

            if (angleMinutes <= Math.PI) {
                console.log(angleMinutes);
                activeClockArc(ctx, angleMinutes, false, colors[colorName]);
                activeClockTriangle(ctx, angleMinutes, colors[colorName]);
            } else {
                ctx.beginPath();
                activeClockArc(ctx, Math.PI, false, colors[colorName]);
                ctx.fillStyle = colors[colorName];
                ctx.fill();

                ctx.save()
                ctx.translate(ctx.canvas.width - 2 * size, 2 * size);
                ctx.scale(1, -1);
                const remainingTime = Math.PI - angleMinutes;
                activeClockArc(ctx, remainingTime, true, colors[colorName]);
                activeClockTriangle(ctx, remainingTime, colors[colorName]);
                ctx.restore()

            }

            if (angleHours > 2 * Math.PI / 12) {
                ctx.beginPath();
                ctx.arc(ctx.canvas.width - size, size, size, 0, 2 * Math.PI);
                ctx.fillStyle = colors[colorName];
                ctx.fill();
            }
        } else {
            const { angleMinutes, angleHours } = getAngle(clock.scheduledStartTime);

            //minute hand
            handClock(ctx, angleHours, 0.65);;

            //hour hand
            handClock(ctx, angleMinutes, 0.8);

            //small circle in the middel to connect the lines
            ctx.beginPath();
            ctx.arc(ctx.canvas.width - size, size, strokeWidth / 4, 0, 2 * Math.PI);
            ctx.fillStyle = colors[colorName];
            ctx.fill();
        }

        //stroke circle
        ctx.beginPath();
        ctx.arc(ctx.canvas.width - size, size, size, 0, 2 * Math.PI);
        ctx.save();
        ctx.clip();
        ctx.strokeStyle = colors[colorName];
        ctx.lineWidth *= strokeWidth;
        ctx.stroke();
        ctx.restore();
    }

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let animationFrameId

        resizeCanvas(canvas)

        //Our draw came here
        const render = () => {
            draw(context)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])


    return <canvas
        ref={canvasRef} {...props}
        className={className}
        width={canvasSize}
        height={canvasSize}
    />
}

export default Clock;