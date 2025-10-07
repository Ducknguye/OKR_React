<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id('packages_id');
            $table->string('packages_name')->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->decimal('price', 10, 2)->default(0);
            $table->boolean('is_extension')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('packages');
    }
};
