<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id('log_id');
            $table->string('action')->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->string('entity')->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->foreignId('user_id')->constrained('users','user_id')->cascadeOnDelete();
            $table->integer('entity_id')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('audit_logs');
    }
};
