class MessagesController < ApplicationController

  before_action :index_variables, only: [:index, :create]

  def index
  end

  def create
  end

  private
  def index_variables
    @group = Group.find(params[:group_id])
    @user = @group.users
  end
end
