<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id('comment_id');
            $table->text('content')->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->foreignId('kr_id')->constrained('key_results','kr_id')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users','user_id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
};
