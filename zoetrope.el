(defun cherrypy-endpoint ()
  "Create a new endpoint for cherrypy"
  (interactive "*")
  (setq endpoint-name (read-string "Endpoint name: "))
  (insert "@cherrypy.expose\n")
  (insert "def " endpoint-name "(self, **kwargs):\n")
  (indent-relative-previous-line)
  )

(defun indent-relative-previous-line ()
  (previous-line)
  (indent-according-to-mode)
  (next-line))
  
(defun zoetrope-deploy ()
  (interactive "*")
  (shell-command "~/src/boincsite/deploy-pi.sh")
)
(global-set-key [f7] 'zoetrope-deploy)
