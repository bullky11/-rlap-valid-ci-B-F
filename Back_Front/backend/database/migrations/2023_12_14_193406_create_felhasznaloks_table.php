<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('felhasznaloks', function (Blueprint $table) {
            $table->id('felh_id');
            $table->string('nev');
            $table->string('email')->unique();
            $table->string('szul_hely');
            $table->integer('szul_ev');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('felhasznaloks');
    }
};
