<?php

use App\Http\Controllers\Authorization\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ExpenseParticipantController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/p', [UserController::class, 'indexPaginate']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/p', [CategoryController::class, 'indexPaginate']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::get('/expenses', [ExpenseController::class, 'index']);
Route::get('/expenses/p', [ExpenseController::class, 'indexPaginate']);
Route::get('/expenses/{id}', [ExpenseController::class, 'showId']);

Route::get('/expenseParticipants', [ExpenseParticipantController::class, 'index']);
Route::get('/expensesParticipants/{id}', [ExpenseParticipantController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);


Route::get('/users/export/csv', [UserController::class, 'exportToCSV']);
Route::get('/expenses/export/csv', [ExpenseController::class, 'exportToCSV']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });
    Route::resource('/users', UserController::class)
        ->only(['store', 'update', 'destroy']);

    Route::delete('/usersdestroymultiple', [UserController::class, 'destroyMultiple']);

    Route::resource('/expenses', ExpenseController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('/expenseParticipants', ExpenseParticipantController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('/payments', PaymentController::class)
        ->only(['store', 'update', 'destroy']);

    Route::get('/payments', [PaymentController::class, 'index']);
    Route::get('/payments/{id}', [PaymentController::class, 'show']);

    Route::post('/payments/{id}/pay', [PaymentController::class, 'pay']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
