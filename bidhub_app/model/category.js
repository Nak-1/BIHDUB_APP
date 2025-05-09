import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  icon: { 
    type: String,
    default: '/assests/icons/default.png'
  },
  description: { 
    type: String,
    required: true
  },
  itemCount: { 
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  parentCategory: {
    type: Number,
    default: null
  },
  slug: {
    type: String,
    unique: true
  }
}, { 
  timestamps: true 
});

categorySchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

categorySchema.methods.incrementItemCount = function() {
  this.itemCount += 1;
  return this.save();
};

categorySchema.methods.decrementItemCount = function() {
  if (this.itemCount > 0) {
    this.itemCount -= 1;
    return this.save();
  }
  return this;
};

categorySchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug: slug });
};

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;