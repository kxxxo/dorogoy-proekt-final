<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{

    /**
     * @return Item[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return Item::all([
            'id','name','rating'
        ]);
    }



    public function update(Request $request)
    {
        $items = $request->post('items',[]);

        $processed_ids = [];
        foreach ($items as $item){
            if(isset($item['id'])){
                // update
                $model = Item::findOrFail($item['id']);
                $model->fill($item);
                $model->save();
            } else { // CREATE
                $model = new Item();
                $model->name = $item['name'];
                $model->rating = $item['rating'];
                $model->save();
            }
            $processed_ids[] = $model->id;
        }


        $models_to_delete = Item::whereNotIn('id', $processed_ids)->get();

        foreach ($models_to_delete as $model) {
            $model->delete();
        }

        return $this->index();
    }

}
