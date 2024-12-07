<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;
class CheckOrder extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

    public $CustomerName ;
    public $CustomerPhonenumber;
    public $CustomerAddress;
    public $CustomerDetailAddress;
    public $CustomerTimeOrder;
    public $OrderId;
    public $TotalCost;
    public $Product;

    public function __construct($name, $phonenumber, $address, $detailAddress, $timeOrder, $orderId, $totalCost, $product)
    {
        $this->CustomerName = $name;
        $this->CustomerPhonenumber = $phonenumber;
        $this->CustomerAddress = $address;
        $this->CustomerDetailAddress = $detailAddress;
        $this->CustomerTimeOrder = $timeOrder;
        $this->OrderId = $orderId;
        $this->TotalCost = $totalCost;
        $this->Product = $product;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('raven@clothes.com', 'Raven Clothes'),
            subject: 'Xác nhận đơn hàng',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.checkOrder',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
