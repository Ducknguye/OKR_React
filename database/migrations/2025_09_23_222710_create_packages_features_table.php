<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('packages_features', function (Blueprint $table) {
            $table->foreignId('packages_id')->constrained('packages','packages_id')->cascadeOnDelete();
            $table->foreignId('features_id')->constrained('features','features_id')->cascadeOnDelete();
            $table->primary(['packages_id','features_id']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('packages_features');
    }
};
