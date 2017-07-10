<?php

 include_once "AbstractEntity.php";

class Statement extends AbstractEntity
{
    /**
     * @var string
     */
    public $currency;

    /**
     * @var Transaction[]
     */
    public $transactions;

    /**
     * @var \DateTimeInterface
     */
    public $startDate;

    /**
     * @var \DateTimeInterface
     */
    public $endDate;
}
