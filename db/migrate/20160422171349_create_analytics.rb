class CreateAnalytics < ActiveRecord::Migration
  def change
    create_table :analytics do |t|
      t.string :title
      t.string :token
      t.timestamps null: false
    end
  end
end
