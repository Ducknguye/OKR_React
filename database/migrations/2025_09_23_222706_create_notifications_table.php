<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('notification_id');
            $table->string('message')->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->string('type')->nullable()->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->boolean('is_read')->default(false);
            $table->foreignId('user_id')->constrained('users','user_id')->cascadeOnDelete();
            $table->foreignId('cycle_id')->constrained('cycles','cycle_id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
};
