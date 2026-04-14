const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:    { type: String, required: true },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  description:   { type: String, required: true },
  price:         { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  category:      { type: String, required: true, enum: ['Living Room', 'Bedroom', 'Dining', 'Office'] },
  image:         { type: String, required: true },
  rating:        { type: Number, default: 4.5, min: 0, max: 5 },
  reviews:       [reviewSchema],
  numReviews:    { type: Number, default: 0 },
  badge:         { type: String, enum: ['New', 'Sale', 'Popular', ''], default: '' },
  inStock:       { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
