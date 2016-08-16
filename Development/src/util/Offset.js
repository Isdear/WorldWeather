/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
/**
 * @exports Offset
 * @version $Id: Offset.js 2958 2015-04-01 23:25:29Z tgaskins $
 */
define(['../geom/Vec2'
    ],
    function (Vec2) {
        

        /**
         * Constructs an offset instance given specified units and offsets.
         * @alias Offset
         * @constructor
         * @classdesc Specifies an offset relative to a rectangle. Used by [Placemark]{@link Placemark} and
         * other shapes.
         * @param {String} xUnits The type of units specified for the X dimension. May be one of the following:
         * <ul>
         *     <li>[WorldWind.OFFSET_FRACTION]{@link WorldWind#OFFSET_FRACTION}</li>
         *     <li>[WorldWind.OFFSET_INSET_PIXELS]{@link WorldWind#OFFSET_INSET_PIXELS}</li>
         *     <li>[WorldWind.OFFSET_PIXELS]{@link WorldWind#OFFSET_PIXELS}</li>
         * </ul>
         * @param {Number} x The offset in the X dimension.
         * @param {String} yUnits The type of units specified for the Y dimension, assuming a lower-left Y origin.
         * May be one of the following:
         * <ul>
         *     <li>[WorldWind.OFFSET_FRACTION]{@link WorldWind#OFFSET_FRACTION}</li>
         *     <li>[WorldWind.OFFSET_INSET_PIXELS]{@link WorldWind#OFFSET_INSET_PIXELS}</li>
         *     <li>[WorldWind.OFFSET_PIXELS]{@link WorldWind#OFFSET_PIXELS}</li>
         * </ul>
         * @param {Number} y The offset in the Y dimension.
         */
        var Offset = function (xUnits, x, yUnits, y) {

            /**
             * The offset in the X dimension, interpreted according to this instance's xUnits argument.
             * @type {Number}
             */
            this.x = x;

            /**
             * The offset in the Y dimension, interpreted according to this instance's yUnits argument.
             * @type {Number}
             */
            this.y = y;

            /**
             * The units of this instance's X offset. See this class' constructor description for a list of the
             * possible values.
             * @type {String}
             */
            this.xUnits = xUnits;

            /**
             * The units of this instance's Y offset. See this class' constructor description for a list of the
             * possible values.
             * @type {String}
             */
            this.yUnits = yUnits;
        };

        /**
         * Creates a new copy of this offset with identical property values.
         * @returns {Offset} A new offset instance with its property values the same as this one's.
         */
        Offset.prototype.clone = function () {
            return new Offset(this.xUnits, this.x, this.yUnits, this.y);
        };

        /**
         * Returns this offset's absolute X and Y coordinates in pixels for a rectangle of a specified size in pixels.
         * The returned offset is in pixels relative to the rectangle's origin, and is defined in the coordinate
         * system used by the caller.
         * @param {Number} width The rectangle's width in pixels.
         * @param {Number} height The rectangles height in pixels.
         * @returns {Vec2} The computed offset relative to the rectangle's origin.
         */
        Offset.prototype.offsetForSize = function (width, height) {
            var x, y;

            if (this.xUnits == WorldWind.OFFSET_FRACTION) {
                x = width * this.x;
            } else if (this.xUnits == WorldWind.OFFSET_INSET_PIXELS) {
                x = width - this.x;
            } else { // default to OFFSET_PIXELS
                x = this.x;
            }

            if (this.yUnits == WorldWind.OFFSET_FRACTION) {
                y = height * this.y;
            } else if (this.yUnits == WorldWind.OFFSET_INSET_PIXELS) {
                y = height - this.y;
            } else { // default to OFFSET_PIXELS
                y = this.y;
            }

            return new Vec2(x, y);
        };

        /**
         * Returns a string representation of this object.
         * @returns {String} A string representation of this object.
         */
        Offset.prototype.toString = function () {
            return this.xUnits + " " + this.x + " " + this.yUnits + " " + this.y;
        };

        return Offset;
    });