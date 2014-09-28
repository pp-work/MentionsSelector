<?php if (!defined('APPLICATION')) exit();

// Define the plugin:
$PluginInfo['MentionsSelector'] = array(
   'Name' => 'MentionsSelector',
   'Description' => 'Help the user select a correct username when mentioning',
   'Version' => '0.6',
   'RequiredApplications' => array('Vanilla' => '2.0.18'),
   'Author' => 'Rasmus Eneman',
   'AuthorEmail' => 'rasmus@eneamn.eu',
   'AuthorUrl' => 'http://rasmus.eneman.eu/',
   'RequiredTheme' => FALSE,
   'RequiredPlugins' => FALSE,
   'MobileFriendy' => TRUE,
   'HasLocale' => FALSE
);

class MentionsSelector extends Gdn_Plugin {

   public function LoadLookup($Sender){
     $Sender->AddJsFile($this->GetResource('js/mentions_selector.js', FALSE, FALSE));

   }

   public function DiscussionController_Render_Before($Sender) {
      $this->LoadLookup($Sender);
   }

   public function PostController_Render_Before($Sender) {
      $this->LoadLookup($Sender);
   }
}
