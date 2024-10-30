<?php

namespace App\Events;

use App\Models\Survey;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FormClosed implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Survey $survey)
    {
        //
    }

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('survey.' . $this->survey->id);
    }

    public function broadcastAs(): string
    {
        return 'formClosed';
    }
}
