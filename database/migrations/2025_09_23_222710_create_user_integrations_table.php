<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('user_integrations', function (Blueprint $table) {
            $table->id('user_integration_id');
            $table->string('config')->nullable()->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->foreignId('user_id')->constrained('users','user_id')->cascadeOnDelete();
            $table->foreignId('integration_id')->constrained('integrations','integration_id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_integrations');
    }
};
