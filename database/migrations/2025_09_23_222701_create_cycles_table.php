<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cycles', function (Blueprint $table) {
            $table->id('cycle_id');
            $table->string('cycle_name')->nullable()->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->string('status')->nullable()->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->text('description')->nullable()->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cycles');
    }
};
