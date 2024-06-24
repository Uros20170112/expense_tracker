<?php

namespace App\Http\Controllers;

use App\Http\Resources\Expense\ExpenseCollection;
use App\Models\Expense;
use Illuminate\Http\Request;
use App\Http\Resources\Expense\ExpenseResource;
use Illuminate\Support\Facades\Validator;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $paidBy = $request->query('paid_by');

        if ($paidBy) {
            $expenses = Expense::where('paid_by', $paidBy)->get();
        } else {
            $expenses = Expense::all();
        }
        return ExpenseResource::collection($expenses);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'paid_by' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'paid_on' => 'date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $expense = Expense::create($request->all());

        return new ExpenseResource($expense);
    }
    public function indexPaginate()
    {
        $expenses = Expense::all();
        if (is_null($expenses)) {
            return response()->json('No expenses found', 404);
        }
        $expenses = Expense::paginate(5);
        return response()->json(new ExpenseCollection($expenses));
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        return new ExpenseResource($expense);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'sometimes|required|string|max:255',
            'amount' => 'sometimes|required|numeric',
            'paid_by' => 'sometimes|required|exists:users,id',
            'category_id' => 'sometimes|required|exists:categories,id',
            'paid_on' => 'sometimes|date',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $expense->update($request->all());

        return new ExpenseResource($expense);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return response()->json('Expense is deleted');
    }

    public function exportToCSV()
    {
        $fileName = 'expenses.csv';
        $expenses = Expense::all();

        $headers = [
            "Content-Type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];

        $columns = ['ID', 'Description', 'Amount', 'Paid By', 'Category ID', 'Paid On', 'Created At', 'Updated At'];

        $callback = function () use ($expenses, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($expenses as $expense) {
                $row['ID'] = $expense->id;
                $row['Description'] = $expense->description;
                $row['Amount'] = $expense->amount;
                $row['Paid By'] = $expense->paid_by;
                $row['Category ID'] = $expense->category_id;
                $row['Paid On'] = $expense->paid_on;
                $row['Created At'] = $expense->created_at;
                $row['Updated At'] = $expense->updated_at;

                fputcsv($file, array($row['ID'], $row['Description'], $row['Amount'], $row['Paid By'], $row['Category ID'], $row['Paid On'], $row['Created At'], $row['Updated At']));
            }

            fclose($file);
        };

        return Response::stream($callback, 200, $headers);
    }
}
