<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Exports\BulkExport;
use App\Imports\BulkImport;
use Maatwebsite\Excel\Facades\Excel;

class ImportExportController extends Controller
{
    public function importExportView()
    {
       return view('importexport');
    }
    public function import() 
    {
        Excel::import(new BulkImport,request()->file('file'));
           
        return back();
    }
}
