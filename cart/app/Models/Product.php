<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use HasFactory, HasSlug, Searchable;

    protected $fillable = ['name','slug','user_id','category','description','quantity','price','image','sizes','colors'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
        ->generateSlugsFrom('name')
        ->saveSlugsTo('slug');
    }

    public function toSearchableArray()
    {
        return [
            'name' => $this->name,
            'category' => $this->category,
        ];
    }
}
