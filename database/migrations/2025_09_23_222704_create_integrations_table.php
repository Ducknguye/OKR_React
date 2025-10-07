<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('integrations', function (Blueprint $table) {
            $table->id('integration_id');
            $table->string('integration_name')->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->string('description')->nullable()->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->string('status')->nullable()->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('integrations');
    }
};
