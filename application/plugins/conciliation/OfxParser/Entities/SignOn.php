<?php

 include_once "AbstractEntity.php";

class SignOn extends AbstractEntity
{
    /**
     * @var Status
     */
    public $status;

    /**
     * @var \DateTimeInterface
     */
    public $date;

    /**
     * @var string
     */
    public $language;

    /**
     * @var Institute
     */
    public $institute;
}
